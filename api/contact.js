import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Add CORS setup in case that's why the browser is failing the request
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: `Method not allowed. Received method: ${req.method}` });
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