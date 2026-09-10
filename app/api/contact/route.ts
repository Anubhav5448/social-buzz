// app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, service, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,     // e.g. smtp.gmail.com
      port: Number(process.env.SMTP_PORT), // 465 (SSL) or 587 (TLS)
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Social Buzz Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER,   // where enquiries should land
      replyTo: email,                     // so you can reply directly to the enquirer
      subject: `New enquiry: ${service} — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nService: ${service}\n\n${message}`,
      html: `
        <h2>New enquiry from the website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to send enquiry" },
      { status: 500 }
    );
  }
}