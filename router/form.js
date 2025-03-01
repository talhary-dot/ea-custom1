import express from "express";
import multer from "multer";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import 'dotenv/config'
const router = express.Router();

// Helper to resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer setup for file upload
const upload1 = () => {
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads/")); // Directory to save uploaded files
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
      },
    }),
  });
};

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL, // Replace with your Gmail address
    pass: process.env.SMTP_PASS, // Replace with your Gmail app password
  },
});

router.post("/", upload1().single("image"), async (req, res) => {
  try {
    const { email, firstName, lastName, postcode, phone, moreDetails } = req.body;
    const file = req.file;
    console.log(file)
    // Construct the email body
    const mailOptions = {
      from: process.env.SMTP_EMAIL, // Sender's email
      to: "talhgfhj6@gmail.com", // Replace with recipient's email
      subject: "New Form Submission",
      text: `
        You have received a new form submission:
        - Email: ${email}
        - First Name: ${firstName}
        - Last Name: ${lastName}
        - Postcode: ${postcode}
        - Phone: ${phone}
        - More Details: ${moreDetails}
      `,
      // Attach the file if it exists
      attachments: file
        ? [
            {
              filename: file.originalname,
              path: file.path,
            },
          ]
        : [],
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Clean up the uploaded file if it exists
    if (file) {
      fs.unlinkSync(file.path); // Delete the file after sending the email
    }

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email", error: error.message });
  }
});

export default router;
