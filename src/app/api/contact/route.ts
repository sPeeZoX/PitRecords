import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(request: Request): Promise<NextResponse> {
  const body: ContactPayload = await request.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "PIT RECORDS <contact@pitrecords.org>",
    to: "yvevti@gmail.com",
    replyTo: email,
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family:monospace;background:#000;color:#fff;padding:32px;max-width:600px">
        <p style="color:rgba(255,255,255,0.4);font-size:11px;letter-spacing:0.3em;margin:0 0 24px">
          PIT RECORDS — CONTACT FORM
        </p>
        <p style="margin:0 0 8px"><strong>Name:</strong> ${name}</p>
        <p style="margin:0 0 24px"><strong>Email:</strong>
          <a href="mailto:${email}" style="color:#fff">${email}</a>
        </p>
        <hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:24px 0"/>
        <p style="margin:0 0 8px;color:rgba(255,255,255,0.4);font-size:11px;letter-spacing:0.2em">
          MESSAGE
        </p>
        <p style="white-space:pre-wrap;color:rgba(255,255,255,0.8);line-height:1.7;margin:0">
          ${message}
        </p>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
