import { model, Schema } from "mongoose";
const testimonialSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    message: { type: String, require: true },
    profileImage: { type: String, default: "/images/default.png" },
    user: { type: Schema.ObjectId, ref: "User" },
    rating: { type: Number, required: true, default: 3 }
}, { timestamps: true });
const Testimonial = model('Testimonials', testimonialSchema);
export default Testimonial;
