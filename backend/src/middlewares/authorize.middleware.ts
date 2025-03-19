import User from "../models/user.model.js";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { Session, SessionData } from 'express-session';
import { getUser } from "../service/jwt.service.js";

declare global {
	namespace Express {
		export interface Request {
      users?: {
				_id: mongoose.Types.ObjectId;
				name: string;
				email: string;
				password: string;
				profileImage: string;
				createdAt: Date;
				updatedAt: Date;
			};
		}
	}
}


interface CustomRequest extends Request {
  session: Session & Partial<SessionData & { userToken?: string | null }>;
}

const authorize = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token: string | null | undefined = req.session.userToken;
    console.log(req.session);
    

    if (!token) {
      res.status(401).json({ status: false, message: "Unauthorized - No token provided. Check are you logged In" });
      return;
    }

    const decoded = getUser(token);

    if (!decoded) {
      res.status(401).json({ status: false, message: "Unauthorized - Invalid Token. Check are you logged In" });
      return;
    }

    const user = await User.findById(decoded.userId);
    if (!user || !user._id || !user.name || !user.email || !user.password || !user.profileImage) {
      res.status(404).json({ status: false, message: "User not found. Check are you logged In" });
      return;
    }

    req.users = {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      profileImage: user.profileImage,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt
    };

    next();
  } catch (error: any) {
    console.error("Error in authorize middleware", error.message);
    res.status(500).json({ message: "Internal Server Error. Check are you logged In" });
  }
};

export default authorize;
