import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const phone = String(body?.phone ?? "").trim();
    const inventory = String(body?.inventory ?? "").trim();

    if (!name || !email || !phone || !inventory) {
      return NextResponse.json(
        { error: "Please complete all fields." },
        { status: 400 }
      );
    }

    const ownerEmail = process.env.OWNER_EMAIL;
    const resendKey = process.env.RESEND_API_KEY;
    const from = process.env.EMAIL_FROM || "SellMyInventoryUSA <onboarding@resend.dev>";

    if (!ownerEmail || !resendKey) {
      return NextResponse.json(
        {
          error:
            "Email delivery is not configured yet. Add OWNER_EMAIL and RESEND_API_KEY to your environment."
        },
        { status: 503 }
      );
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to: [ownerEmail],
        reply_to: email,
        subject: `New inventory inquiry — ${name}`,
        text: [
          "New SellMyInventoryUSA inquiry",
          "",
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone}`,
          "",
          "Inventory:",
          inventory
        ].join("\n"),
        html: `
          <h2>New inventory inquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
          <h3>Inventory</h3>
          <p>${escapeHtml(inventory).replace(/\n/g, "<br>")}</p>
        `
      })
    });

    if (!response.ok) {
      console.error("Resend error:", await response.text());
      return NextResponse.json(
        { error: "We couldn't send the inquiry right now. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Invalid request. Please try again." },
      { status: 400 }
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}