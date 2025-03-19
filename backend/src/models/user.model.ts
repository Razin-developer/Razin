import mongoose, { model, ObjectId, Schema, Types } from "mongoose";

const userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  role: { type: String, enum: ['user', 'admin'], default: "user" },
  profileImage: { type: String, default: "/default/default.png" }
}, { timestamps: true })

const User = model('User', userSchema);

export default User;

export interface IUser {
  _id: Types.ObjectId;
  name: string; 
  email: string; 
  password: string; 
  profileImage: string; 
  createdAt: Date; 
  updatedAt: Date; 
}