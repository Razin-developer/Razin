var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import 'dotenv/config';
import User from '../models/user.model.js';
import { setJwt } from '../service/jwt.service.js';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import cloudinary from '../service/cloudinary.service.js';
export function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                res.status(400).json({ status: false, message: 'Please fill all the fields' });
                return;
            }
            if (password.length < 6) {
                res.status(400).json({ status: false, message: 'Password should be at least 6 characters long' });
                return;
            }
            const existingUser = yield User.findOne({ email });
            if (existingUser) {
                res.status(400).json({ status: false, message: 'User already exists' });
                return;
            }
            const salt = yield bcrypt.genSalt(10);
            const hashedPassword = yield bcrypt.hash(password, salt);
            const user = yield User.create({ name, email, password: hashedPassword, role: 'user', post: [] });
            if (!user) {
                res.status(500).json({ status: false, message: 'Internal Server Error' });
                return;
            }
            const token = setJwt(String(user._id));
            req.session.userToken = token;
            res.status(200).json({ status: true, message: 'Signup successful', user });
        }
        catch (error) {
            console.error('Error in signup controller:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
}
export function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ status: false, message: 'All fields are required' });
                return;
            }
            const user = yield User.findOne({ email });
            if (!user || !user.password) {
                res.status(404).json({ status: false, message: 'Invalid Credentials' });
                return;
            }
            const isMatch = yield bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(404).json({ status: false, message: 'Invalid Credentials' });
                return;
            }
            const token = setJwt(String(user._id));
            req.session.userToken = token;
            res.status(200).json({ status: true, message: 'Login successful', user });
        }
        catch (error) {
            console.error('Error in login controller:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
}
export function logout(req, res) {
    try {
        req.session.userToken = null;
        res.status(200).json({ status: true, message: 'Logout successful' });
    }
    catch (error) {
        console.error('Error in logout controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
export function checkLoggedIn(req, res) {
    try {
        const user = req.users;
        if (!user) {
            res.status(401).json({ status: false, message: 'Unauthorized. Check are you logged In' });
            return;
        }
        res.status(200).json({ message: 'User Logged In', user });
    }
    catch (error) {
        console.error('Error in checkLoggedIn controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
export function handleUserReset(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password, confirm } = req.body;
            if (!password) {
                res.status(400).json({ status: false, message: "Password is required" });
                return;
            }
            else if (password.length < 6) {
                res.status(400).json({ status: false, message: "Password should be at least 6 characters long" });
                return;
            }
            else if (password !== confirm) {
                res.status(400).json({ status: false, message: "Passwords do not match" });
                return;
            }
            bcrypt.genSalt(10, function (err, salt) {
                if (typeof salt !== 'string') {
                    res.status(500).json({ status: false, message: "Internal server error" });
                    return;
                }
                bcrypt.hash(password, salt, function (err, hash) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (err)
                            return res.status(500).json({ status: false, message: "Internal server error" });
                        const user = yield User.findOneAndUpdate({ email }, {
                            password: hash
                        }, { new: true });
                        if (user) {
                            const token = setJwt(String(user._id));
                            req.session.userToken = token;
                            res.status(200).json({ status: true, message: "Reset Successfully", user });
                        }
                        else {
                            res.status(404).json({ status: false, message: "User not found" });
                        }
                    });
                });
            });
        }
        catch (error) {
            console.error("Error in handleUserReset:", error);
            res.status(500).json({ status: false, message: "Internal server error" });
            return;
        }
    });
}
export function handleUserForgot(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email } = req.body;
            const user = yield User.findOne({ email });
            if (!user) {
                res.status(404).json({ status: false, message: "User not found" });
                return;
            }
            const password = Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit number
            console.log("Generated Reset Code:", password);
            const sub = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Get Code</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; text-align: center;">
        <div style="max-width: 500px; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); margin: auto;">
            <h2 style="color: #333;">Get Code</h2>
            <p style="color: #555;">We received a request to get code for your account.</p>
            <p style="font-size: 16px; font-weight: bold; color: #ff5733;">Your reset code: 
                <span style="background-color: #f8d7da; padding: 5px 10px; border-radius: 5px;">${password}</span>
            </p>
            <p style="color: #555; margin-top: 20px;">This code will expire in <strong>5 days</strong>. Do not share this email with anyone.</p>
            <p style="font-size: 14px; color: #777;">If you did not request this password reset, you can ignore this email.</p>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
            <p style="font-size: 12px; color: #777;">© 2025 Chatty. All Rights Reserved.</p>
        </div>
    </body>
    </html>`;
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.MAIL_EMAIL,
                    pass: process.env.MAIL_PASS
                }
            });
            const mailOptions = {
                from: `"EntreFlow" <${process.env.MAIL_EMAIL}>`, // Change the sender's name
                to: email,
                subject: "Get Your Code",
                html: sub
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error while sending email:", error);
                    return res
                        .status(500)
                        .json({ status: false, message: "Failed to send email" });
                }
                console.log("Email sent: " + info.response);
                return res.status(200).json({ status: true, code: password });
            });
        }
        catch (error) {
            console.error("Error in handleUserForgot:", error);
            res
                .status(500)
                .json({ status: false, message: "Internal server error" });
            return;
        }
    });
}
export function handleUserForgotSuccess(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email } = req.body;
            console.log(email);
            console.log(req.body);
            const user = yield User.findOne({ email });
            if (user) {
                const token = setJwt(String(user._id));
                req.session.userToken = token;
                res.status(200).json(user);
            }
            else {
                res.status(400).json({ message: "Cant find user email: " + email });
            }
        }
        catch (error) {
            console.log("Error in handleUserForgotSuccess:", error);
            res.status(500).json({ status: false, message: "Internal server error" });
            return;
        }
    });
}
export function handleUpdate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const userId = (_a = req.users) === null || _a === void 0 ? void 0 : _a._id;
            const profileImage = req.body.image;
            console.log(profileImage);
            console.log(req.body);
            if (!userId) {
                res.status(401).json({ status: false, message: 'Unauthorized. Check are you logged In' });
                return;
            }
            if (!profileImage) {
                res.status(400).json({ message: "Provide a image" });
                return;
            }
            const uploadResponse = yield cloudinary.uploader.upload(profileImage);
            const newUser = yield User.findByIdAndUpdate(userId, // Pass only the ID here
            { profileImage: uploadResponse.secure_url }, { new: true });
            const token = setJwt(String(newUser === null || newUser === void 0 ? void 0 : newUser._id));
            req.session.userToken = token;
            res.status(200).json({ message: 'Updated Successfully', user: newUser });
            return;
        }
        catch (error) {
            console.error('Error in update controller:', error);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
    });
}
export function handleUserGoogleLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const email = req.user.emails[0].value;
            const user = yield User.findOne({
                email
            });
            const password = Math.floor(100000 + Math.random() * 900000).toString(); // creates a 6-digit number
            if (!user) {
                try {
                    const salt = yield bcrypt.genSalt(10);
                    const hash = yield bcrypt.hash(password, salt);
                    const newUser = yield User.create({
                        name: req.user.displayName,
                        email: email,
                        profileImage: req.user.photos[0].value,
                        password: hash
                    });
                    const token = setJwt(String(newUser._id));
                    req.session.userToken = token;
                    if (process.env.NODE_ENV === "production") {
                        res.redirect("/");
                        return;
                    }
                    else {
                        res.redirect("http://localhost:5173/");
                    }
                }
                catch (error) {
                    console.error("Error in handleUserGoogleLogin:", error);
                    res.status(500).json({ message: "Internal server error" });
                }
            }
            else {
                const token = setJwt(String(user._id));
                req.session.userToken = token;
                if (process.env.NODE_ENV === "production") {
                    res.redirect("/");
                    return;
                }
                else {
                    res.redirect("http://localhost:5173/");
                }
            }
        }
        catch (error) {
            console.error('Error in handleUserGoogleLogin:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
}
