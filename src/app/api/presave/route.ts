import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request): Promise<NextResponse> {
  const body = await request.json();
  const { email } = body;

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // Notify the team
  await resend.emails.send({
    from: "PIT RECORDS <contact@pitrecords.org>",
    to: "yvevti@gmail.com",
    subject: `AFTERSHOCK — New pre-save: ${email}`,
    text: `New AFTERSHOCK pre-save from: ${email}`,
    html: `
      <div style="font-family:monospace;background:#000;color:#fff;padding:32px;max-width:600px">
        <p style="color:rgba(255,255,255,0.4);font-size:11px;letter-spacing:0.3em;margin:0 0 24px">
          PIT RECORDS — AFTERSHOCK PRE-SAVE
        </p>
        <p style="margin:0"><strong>Email:</strong> <a href="mailto:${email}" style="color:#fff">${email}</a></p>
      </div>
    `,
  });

  // Confirm to the subscriber
  const { error } = await resend.emails.send({
    from: "PIT RECORDS <contact@pitrecords.org>",
    to: email,
    subject: "You're on the list — AFTERSHOCK by MUZZZ",
    text: "You've been added to the AFTERSHOCK list. We'll notify you when it drops midnight 16.05.2026.",
    html: `
      <div style="font-family:monospace;background:#000;color:#fff;padding:40px;max-width:600px">
        <p style="color:rgba(255,255,255,0.3);font-size:11px;letter-spacing:0.4em;margin:0 0 32px">PIT RECORDS</p>
        <h1 style="font-size:3rem;font-weight:900;margin:0 0 8px;letter-spacing:-0.04em;line-height:1">AFTERSHOCK</h1>
        <p style="color:rgba(255,255,255,0.4);font-size:12px;letter-spacing:0.3em;margin:0 0 40px">MUZZZ · EP · 2026</p>
        <hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:0 0 32px"/>
        <p style="color:rgba(255,255,255,0.7);line-height:1.8;margin:0 0 16px">You're on the list.</p>
        <p style="color:rgba(255,255,255,0.7);line-height:1.8;margin:0 0 40px">We'll hit you the second it drops — midnight 16.05.2026.</p>
        <p style="color:rgba(255,255,255,0.3);font-size:11px;letter-spacing:0.2em">— PIT RECORDS</p>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
