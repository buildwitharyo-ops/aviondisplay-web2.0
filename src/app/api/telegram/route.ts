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

async function githubRequest(filePath: string, method: string, body: object) {
  return fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
    {
      method,
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify(body),
    }
  );
}

async function getFileSha(filePath: string): Promise<string | null> {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
  if (!res.ok) return null;
  const data = await res.json() as { sha?: string };
  return data.sha ?? null;
}

async function commitToGitHub(filePath: string, content: string, commitMsg: string) {
  const encoded = Buffer.from(content).toString("base64");
  return githubRequest(filePath, "PUT", { message: commitMsg, content: encoded, branch: "main" });
}

async function deleteFromGitHub(filePath: string, sha: string, commitMsg: string) {
  return githubRequest(filePath, "DELETE", { message: commitMsg, sha, branch: "main" });
}

/* ── Image upload via Telegram ── */
async function handlePhoto(chatId: string, message: TelegramMessage) {
  if (!GITHUB_TOKEN) {
    await sendTg(chatId, "❌ `GITHUB_TOKEN` belum dikonfigurasi.");
    return;
  }

  // Pick highest-resolution photo
  const photos = message.photo!;
  const photo = photos[photos.length - 1];
  const caption = message.caption ?? "";

  // Get file path from Telegram
  const fileRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${photo.file_id}`);
  const fileData = await fileRes.json() as { ok: boolean; result?: { file_path?: string } };
  if (!fileData.ok || !fileData.result?.file_path) {
    await sendTg(chatId, "❌ Gagal mengambil file dari Telegram.");
    return;
  }

  const tgFilePath = fileData.result.file_path;
  const ext = tgFilePath.split(".").pop() ?? "jpg";
  const fileName = caption
    ? `${slugify(caption)}.${ext}`
    : `blog-${Date.now()}.${ext}`;

  // Download from Telegram
  const dlRes = await fetch(`https://api.telegram.org/file/bot${BOT_TOKEN}/${tgFilePath}`);
  if (!dlRes.ok) {
    await sendTg(chatId, "❌ Gagal mendownload gambar dari Telegram.");
    return;
  }
  const buffer = await dlRes.arrayBuffer();
  const encoded = Buffer.from(buffer).toString("base64");

  // Upload to GitHub
  const ghPath = `public/blog-images/${fileName}`;
  const ghRes = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${ghPath}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({
        message: `content: upload blog image ${fileName}`,
        content: encoded,
        branch: "main",
      }),
    }
  );

  if (ghRes.ok) {
    const imgPath = `/blog-images/${fileName}`;
    await sendTg(
      chatId,
      `✅ *Gambar berhasil diupload!*\n\nGunakan path ini di CoverImage atau konten artikel:\n\`${imgPath}\`\n\nContoh di markdown:\n\`![Alt text](${imgPath})\``
    );
  } else {
    const err = await ghRes.json().catch(() => ({})) as { message?: string };
    await sendTg(chatId, `❌ Gagal upload ke GitHub: \`${err.message ?? `HTTP ${ghRes.status}`}\``);
  }
}

/* ── Blog post parser ── */
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

/* ── Help text ── */
const HELP_TEXT = `🤖 *AVION Web Bot*

*Commands:*
/newpost — Publish blog post baru
/deletepost \\[slug\\] — Hapus blog post
/help — Panduan ini

*Upload Gambar:*
Kirim foto ke bot (dengan caption = nama file opsional).
Bot akan upload ke GitHub dan balas dengan path-nya.

*Format /newpost:*
\`\`\`
/newpost
Judul: Judul Artikel Anda
Kategori: Interactive Display
Tags: smartboard, tips
Excerpt: Ringkasan singkat.
ReadTime: 5
CoverImage: /blog-images/nama-gambar.jpg
Penulis: Tim AVION

---

Isi artikel **markdown** di sini.

## Subjudul
Paragraf...
\`\`\`

*Format /deletepost:*
\`/deletepost https://aviondisplay.com/blog/slug-artikel\``;

/* ── Types ── */
interface TelegramPhoto {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
}

interface TelegramMessage {
  chat: { id: number };
  text?: string;
  caption?: string;
  photo?: TelegramPhoto[];
}

/* ── Route Handler ── */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message: TelegramMessage | undefined = body?.message;
    if (!message) return NextResponse.json({ ok: true });

    const chatId = String(message.chat?.id);

    // Only respond to authorized user
    if (chatId !== AUTHORIZED_CHAT_ID) return NextResponse.json({ ok: true });

    const text = message.text ?? "";

    /* ── Photo upload ── */
    if (message.photo?.length) {
      await handlePhoto(chatId, message);
      return NextResponse.json({ ok: true });
    }

    /* ── /help or /start ── */
    if (text === "/start" || text === "/help") {
      await sendTg(chatId, HELP_TEXT);
      return NextResponse.json({ ok: true });
    }

    /* ── /newpost ── */
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
        await sendTg(chatId, `❌ *Error:* ${msg}\n\nKetik /help untuk format yang benar.`);
        return NextResponse.json({ ok: true });
      }

      await sendTg(chatId, `⏳ Memproses post *"${post.title}"*...`);

      const filePath = `src/content/blog/${post.slug}.mdx`;
      const ghRes = await commitToGitHub(filePath, buildMdx(post), `content: add blog post "${post.title}"`);

      if (ghRes.ok) {
        await sendTg(
          chatId,
          `✅ *Post berhasil dipublish!*\n\n📝 *${post.title}*\n📅 ${post.date}\n🔗 aviondisplay.com/blog/${post.slug}\n\n_Vercel deploy ~1–2 menit._`
        );
      } else {
        const err = await ghRes.json().catch(() => ({})) as { message?: string };
        await sendTg(chatId, `❌ Gagal commit ke GitHub: \`${err.message ?? `HTTP ${ghRes.status}`}\``);
      }

      return NextResponse.json({ ok: true });
    }

    /* ── /deletepost [url or slug] ── */
    if (text.startsWith("/deletepost")) {
      if (!GITHUB_TOKEN) {
        await sendTg(chatId, "❌ `GITHUB_TOKEN` belum dikonfigurasi.");
        return NextResponse.json({ ok: true });
      }

      const raw = text.replace(/^\/deletepost\s*/i, "").trim();
      if (!raw) {
        await sendTg(chatId, "❌ Format: `/deletepost https://aviondisplay.com/blog/slug-artikel`");
        return NextResponse.json({ ok: true });
      }

      // Extract slug whether user pastes full URL or just the slug
      let slug = raw;
      try {
        const url = new URL(raw);
        const parts = url.pathname.split("/").filter(Boolean);
        slug = parts[parts.length - 1];
      } catch {
        // raw is already a slug, use as-is
      }

      const filePath = `src/content/blog/${slug}.mdx`;
      await sendTg(chatId, `⏳ Menghapus post \`${slug}\`...`);

      const sha = await getFileSha(filePath);
      if (!sha) {
        await sendTg(chatId, `❌ Post \`${slug}\` tidak ditemukan.\n\nPastikan slug sudah benar.`);
        return NextResponse.json({ ok: true });
      }

      const ghRes = await deleteFromGitHub(filePath, sha, `content: delete blog post "${slug}"`);

      if (ghRes.ok) {
        await sendTg(chatId, `✅ Post \`${slug}\` berhasil dihapus!\n\n_Vercel deploy ~1–2 menit._`);
      } else {
        const err = await ghRes.json().catch(() => ({})) as { message?: string };
        await sendTg(chatId, `❌ Gagal hapus dari GitHub: \`${err.message ?? `HTTP ${ghRes.status}`}\``);
      }

      return NextResponse.json({ ok: true });
    }

    /* ── Unknown ── */
    await sendTg(chatId, "Ketik /help untuk melihat daftar commands.");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Telegram Webhook]", err);
    return NextResponse.json({ ok: true }); // Always 200 to Telegram
  }
}
