import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  nama: string;
  perusahaan: string;
  email: string;
  telepon: string;
  produk?: string;
  pesan?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json();

    const { nama, perusahaan, email, telepon, produk, pesan } = body;

    // Basic validation
    if (!nama || !perusahaan || !email || !telepon) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    // Format message
    const message = [
      "📋 *New Contact Form — AVION Display*",
      "",
      `👤 *Nama:* ${nama}`,
      `🏢 *Perusahaan:* ${perusahaan}`,
      `📧 *Email:* ${email}`,
      `📱 *Telepon:* ${telepon}`,
      produk ? `📦 *Produk:* ${produk}` : null,
      pesan ? `💬 *Pesan:*\n${pesan}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    // Forward to Telegram if configured
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const tgRes = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "Markdown",
          }),
        }
      );

      if (!tgRes.ok) {
        console.error("Telegram send failed:", await tgRes.text());
      }
    } else {
      // Dev fallback — log to console
      console.log("[Contact Form]", { nama, perusahaan, email, telepon, produk, pesan });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[Contact API] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
