import { Request, Response } from 'express';
import 'dotenv/config';

import User, { type IUser } from '../models/user.model.js';
import { setJwt } from '../service/jwt.service.js';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import cloudinary from '../service/cloudinary.service.js';
import { Types } from 'mongoose';
import { Session, SessionData } from 'express-session';

interface CustomRequest extends Request {
  session: Session & Partial<SessionData & { userToken?: string | null }>;
}

export async function signup(req: CustomRequest, res: Response): Promise<void> {
  try {
    const { name, email, password }: { name: string; email: string; password: string } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ status: false, message: 'Please fill all the fields' });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ status: false, message: 'Password should be at least 6 characters long' });
      return;
    }

    const existingUser: IUser | null = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ status: false, message: 'User already exists' });
      return;
    }

    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword, role: 'user', post: [] });

    if (!user) {
      res.status(500).json({ status: false, message: 'Internal Server Error' });
      return;
    }

    const token: string = setJwt(String(user._id));
    req.session.userToken = token;

    res.status(200).json({ status: true, message: 'Signup successful', user });
  } catch (error: unknown) {
    console.error('Error in signup controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function login(req: CustomRequest, res: Response): Promise<void> {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    if (!email || !password) {
      res.status(400).json({ status: false, message: 'All fields are required' });
      return;
    }

    const user: IUser | null = await User.findOne({ email });

    if (!user || !user.password) {
      res.status(404).json({ status: false, message: 'Invalid Credentials' });
      return;
    }

    const isMatch: boolean = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(404).json({ status: false, message: 'Invalid Credentials' });
      return;
    }

    const token: string = setJwt(String(user._id));
    req.session.userToken = token;
    res.status(200).json({ status: true, message: 'Login successful', user });
  } catch (error: unknown) {
    console.error('Error in login controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export function logout(req: CustomRequest, res: Response): void {
  try {
    req.session.userToken = null;
    res.status(200).json({ status: true, message: 'Logout successful' });
  } catch (error: unknown) {
    console.error('Error in logout controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export function checkLoggedIn(req: Request, res: Response): void {
  try {
    const user: IUser | undefined = req.users;

    if (!user) {
      res.status(401).json({ status: false, message: 'Unauthorized. Check are you logged In' });
      return;
    }

    res.status(200).json({ message: 'User Logged In', user });
  } catch (error: unknown) {
    console.error('Error in checkLoggedIn controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function handleUserReset(req: CustomRequest, res: Response): Promise<void> {
  try {
    const { email, password, confirm } = req.body;
    if (!password) {
      res.status(400).json({ status: false, message: "Password is required" });
      return
    }
    else if (password.length < 6) {
      res.status(400).json({ status: false, message: "Password should be at least 6 characters long" });
      return
    }
    else if (password !== confirm) {
      res.status(400).json({ status: false, message: "Passwords do not match" });
      return
    }

    bcrypt.genSalt(10, function (err, salt) {
      if (typeof salt !== 'string') {
        res.status(500).json({ status: false, message: "Internal server error" });
        return
      }

      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.status(500).json({ status: false, message: "Internal server error" });
        const user = await User.findOneAndUpdate(
          { email },
          {
            password: hash
          }, { new: true }
        );
        if (user) {
          const token = setJwt(String(user._id));
          req.session.userToken = token;
          res.status(200).json({ status: true, message: "Reset Successfully", user });
        } else {
          res.status(404).json({ status: false, message: "User not found" });
        }
      });
    });
  } catch (error: unknown) {
    console.error("Error in handleUserReset:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
    return;
  }
}

export async function handleUserForgot(req: Request, res: Response): Promise<void> {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ status: false, message: "User not found" });
      return
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
  } catch (error: unknown) {
    console.error("Error in handleUserForgot:", error);
    res
      .status(500)
      .json({ status: false, message: "Internal server error" });
    return
  }
}

export async function handleUserForgotSuccess(req: CustomRequest, res: Response): Promise<void> {
  try {
    const { email } = req.body;
    console.log(email);
    console.log(req.body);
    const user = await User.findOne({ email });
    if (user) {
      const token = setJwt(String(user._id));
      req.session.userToken = token;
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: "Cant find user email: " + email });
    }
  } catch (error: unknown) {
    console.log("Error in handleUserForgotSuccess:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
    return;
  }
}

export async function handleUpdate(req: CustomRequest, res: Response): Promise<void> {
  try {
    const userId = req.users?._id;
    const profileImage = req.body.image;

    console.log(profileImage);
    console.log(req.body);


    if (!userId) {
      res.status(401).json({ status: false, message: 'Unauthorized. Check are you logged In' });
      return;
    }

    if (!profileImage) {
      res.status(400).json({ message: "Provide a image" })
      return;
    }

    const uploadResponse = await cloudinary.uploader.upload(profileImage);

    const newUser = await User.findByIdAndUpdate(
      userId, // Pass only the ID here
      { profileImage: uploadResponse.secure_url },
      { new: true }
    );


    const token = setJwt(String(newUser?._id));
    req.session.userToken = token;    
    res.status(200).json({ message: 'Updated Successfully', user: newUser });
    return;
  } catch (error: unknown) {
    console.error('Error in update controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
    return;
  }
}

export async function handleUserGoogleLogin(req: CustomRequest, res: Response): Promise<void> {
  try {
    const email = (req.user as any).emails[0].value;
    const user = await User.findOne({
      email
    });

    const password = Math.floor(100000 + Math.random() * 900000).toString(); // creates a 6-digit number

    if (!user) {
      try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const newUser = await User.create({
          name: (req.user as any).displayName,
          email: email,
          profileImage: (req.user as any).photos[0].value,
          password: hash
        });
        const token = setJwt(String(newUser._id));
        req.session.userToken = token;

        if (process.env.NODE_ENV === "production") {
          res.redirect("/");
          return
        } else {
          res.redirect("http://localhost:5173/")
        }
      } catch (error) {
        console.error("Error in handleUserGoogleLogin:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    } else {
      const token = setJwt(String(user._id));
      req.session.userToken = token;

      if (process.env.NODE_ENV === "production") {
        res.redirect("/");
        return
      } else {
        res.redirect("http://localhost:5173/")
      }
    }
  }
  catch (error: unknown) {
    console.error('Error in handleUserGoogleLogin:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}