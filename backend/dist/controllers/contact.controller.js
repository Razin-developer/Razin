var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Contact from "../models/contact.model.js";
import nodemailer from "nodemailer";
export const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { name, email, message, subject } = req.body;
        let { type } = req.body;
        if (!type || type !== "enquiry" || type !== "contact") {
            type = "enquiry";
        }
        if (!name || !email || !message || !subject) {
            res.status(400).json({ message: "All Fields are required" });
            return;
        }
        const contactInfo = Contact.create({ name, email, message, subject, profileImage: (_a = req.users) === null || _a === void 0 ? void 0 : _a.profileImage, type, user: (_b = req.users) === null || _b === void 0 ? void 0 : _b._id });
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_EMAIL,
                pass: process.env.MAIL_PASS
            }
        });
        const mailOptions = {
            from: email, // Change the sender's name
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
            res.status(201).json({ message: "Send Successfully" });
        });
    }
    catch (error) {
        console.log("error in create testimonial controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
