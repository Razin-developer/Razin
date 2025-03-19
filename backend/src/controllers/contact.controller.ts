import { Request, Response } from "express";
import Contact from "../models/contact.model.js";
import nodemailer from "nodemailer";

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, message, subject } = req.body
    let { type } = req.body

    if (!type || type !== "enquiry" || type !== "contact") {
      type = "enquiry"
    }

    if (!name || !email || !message || !subject) { res.status(400).json({ message: "All Fields are required" }); return; }

    const contactInfo = Contact.create({ name, email, message, subject, profileImage: req.users?.profileImage, type, user: req.users?._id })

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_PASS
      }
    });
    const mailOptions = {
      from: email , // Change the sender's name
      to: `"EntreFlow" <${type === "enquiry" ? process.env.ENQUIRY_EMAIL : process.env.CONTACT_EMAIL}>`,
      subject,
      text: message
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error while sending email:", error);
        return res
          .status(500)
          .json({ status: false, message: "Failed to send email" });
      }
      console.log("Email sent: " + info.response);
      res.status(201).json({ message: "Send Successfully" })
    })
  } catch (error: unknown) {
    console.log("error in create testimonial controller", error);
    res.status(500).json({ message: "Internal Server Error" })
  }
}