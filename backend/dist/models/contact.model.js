import { model, Schema } from "mongoose";
const contactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["enquiry", "support"], required: true },
    profileImage: { type: String, default: "/images/default.png" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
const Contact = model('Contact', contactSchema);
export default Contact;
