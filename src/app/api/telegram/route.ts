import { NextRequest, NextResponse } from "next/server";

const AUTHORIZED_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER ?? "buildwitharyo-ops";
const GITHUB_REPO = process.env.GITHUB_REPO ?? "aviondisplay-web2.0";

/* ── Helpers ── */

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function todayDate(): string {
  return new Date().toISOString().split("T")[0];
}

async function sendTg(chatId: string, text: string) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
  });
}

async function commitToGitHub(filePath: string, content: string, commitMsg: string) {
  const encoded = Buffer.from(content).toString("base64");
  return fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({ message: commitMsg, content: encoded, branch: "main" }),
    }
  );
}

/* ── Parser ──
   Format:
   /newpost
   Judul: ...
   Kategori: ...
   Tags: tag1, tag2
   Excerpt: ...
   ReadTime: 5
   CoverImage: /assets/image/...
   Penulis: Tim AVION   (opsional)

   ---

   Isi konten markdown...
*/
function parsePost(text: string) {
  const body = text.replace(/^\/newpost\s*/i, "").trim();
  const sep = body.indexOf("\n---");
  if (sep === -1) throw new Error("Tidak ada separator `---` antara metadata dan konten.");

  const metaBlock = body.slice(0, sep).trim();
  const content = body.slice(sep + 4).trim();
  if (!content) throw new Error("Konten artikel kosong.");

  const meta: Record<string, string> = {};
  for (const line of metaBlock.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim().toLowerCase().replace(/\s+/g, "");
    meta[key] = line.slice(idx + 1).trim();
  }

  const title = meta["judul"] ?? meta["title"];
  if (!title) throw new Error("Field `Judul` wajib diisi.");

  return {
    title,
    slug: slugify(title),
    category: meta["kategori"] ?? meta["category"] ?? "General",
    tags: (meta["tags"] ?? "").split(",").map((t) => t.trim()).filter(Boolean),
    excerpt: meta["excerpt"] ?? "",
    readTime: parseInt(meta["readtime"] ?? "5", 10),
    coverImage: meta["coverimage"] ?? meta["cover"] ?? "/assets/image/AVION HOME.png",
    author: meta["penulis"] ?? meta["author"] ?? "Tim AVION",
    date: todayDate(),
    content,
  };
}

function buildMdx(p: ReturnType<typeof parsePost>): string {
  return `---
title: "${p.title}"
slug: "${p.slug}"
date: "${p.date}"
excerpt: "${p.excerpt}"
coverImage: "${p.coverImage}"
category: "${p.category}"
tags: [${p.tags.map((t) => `"${t}"`).join(", ")}]
author: "${p.author}"
readTime: ${p.readTime}
---

${p.content}
`;
}

const HELP_TEXT = `🤖 *AVION Web Bot*

*Commands:*
/newpost — Publish blog post baru
/help — Tampilkan panduan ini

*Format /newpost:*
\`\`\`
/newpost
Judul: Judul Artikel Anda
Kategori: Interactive Display
Tags: smartboard, tips, panduan
Excerpt: Ringkasan singkat artikel ini.
ReadTime: 5
CoverImage: /assets/image/AVION HOME.png
Penulis: Tim AVION

---

Tulis isi artikel di sini menggunakan **markdown**.

## Subjudul
Paragraf konten...
\`\`\``;

/* ── Route Handler ── */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body?.message;
    if (!message) return NextResponse.json({ ok: true });

    const chatId = String(message.chat?.id);
    const text: string = message.text ?? "";

    // Only respond to authorized user
    if (chatId !== AUTHORIZED_CHAT_ID) return NextResponse.json({ ok: true });

    if (text === "/start" || text === "/help") {
      await sendTg(chatId, HELP_TEXT);
      return NextResponse.json({ ok: true });
    }

    if (text.startsWith("/newpost")) {
      if (!GITHUB_TOKEN) {
        await sendTg(chatId, "❌ `GITHUB_TOKEN` belum dikonfigurasi di environment variables.");
        return NextResponse.json({ ok: true });
      }

      let post: ReturnType<typeof parsePost>;
      try {
        post = parsePost(text);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Format tidak valid.";
        await sendTg(chatId, `❌ *Error:* ${msg}\n\nKetik /help untuk melihat format yang benar.`);
        return NextResponse.json({ ok: true });
      }

      await sendTg(chatId, `⏳ Memproses post *"${post.title}"*...`);

      const mdx = buildMdx(post);
      const filePath = `src/content/blog/${post.slug}.mdx`;
      const ghRes = await commitToGitHub(filePath, mdx, `content: add blog post "${post.title}"`);

      if (ghRes.ok) {
        await sendTg(
          chatId,
          `✅ *Post berhasil dipublish!*\n\n📝 *${post.title}*\n📅 ${post.date}\n🔗 aviondisplay.com/blog/${post.slug}\n\n_Vercel sedang deploy, estimasi 1–2 menit._`
        );
      } else {
        const err = await ghRes.json().catch(() => ({}));
        const errMsg = (err as { message?: string }).message ?? `HTTP ${ghRes.status}`;
        await sendTg(chatId, `❌ Gagal commit ke GitHub: \`${errMsg}\``);
      }

      return NextResponse.json({ ok: true });
    }

    // Unknown command
    await sendTg(chatId, "Ketik /help untuk melihat daftar commands.");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Telegram Webhook]", err);
    return NextResponse.json({ ok: true }); // Always 200 to Telegram
  }
}
