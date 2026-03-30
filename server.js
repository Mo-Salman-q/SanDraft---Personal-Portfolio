import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/contact", async (req, res) => {
    const { name, email, budget, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "Please provide your name, email, and message." });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOwner = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `New Portfolio Message: ${name}`,
            text: `You have a new message from your portfolio website!\n\nName: ${name}\nEmail: ${email}\nBudget: ${budget || 'Not specified'}\nMessage:\n${message}`,
        };

        const mailSender = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Thank you for reaching out, ${name}!`,
            text: `Hi ${name},\n\nThank you for checking out my portfolio and getting in touch! I have received your message and will get back to you as soon as I can.\n\nBest regards,\nMohamed Salman\n\n----------\nYour original message:\n${message}`,
        };

        await transporter.sendMail(mailOwner);
        await transporter.sendMail(mailSender);

        res.json({ success: true, message: "Your message was successfully sent!" });
    } catch (error) {
        console.error("Nodemailer Error:", error);
        res.status(500).json({ success: false, message: "Something went wrong while sending your message. Please try again later." });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});