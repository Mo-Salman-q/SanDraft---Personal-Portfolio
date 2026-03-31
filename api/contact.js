import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, budget, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Please provide your name, email, and message.",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // mail to YOU
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Portfolio Message: ${name}`,
      text: `
Name: ${name}
Email: ${email}
Budget: ${budget || "Not specified"}
Message:
${message}
      `,
    });

    // auto reply
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thanks for reaching out, ${name}!`,
      text: `Hi ${name}, I received your message!`,
    });

    return res.status(200).json({ success: true, message: "Your message was successfully sent!" });

  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}