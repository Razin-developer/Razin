var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/user.model.js";
import { getUser } from "../service/jwt.service.js";
const authorize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.session.userToken;
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
        const user = yield User.findById(decoded.userId);
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
    }
    catch (error) {
        console.error("Error in authorize middleware", error.message);
        res.status(500).json({ message: "Internal Server Error. Check are you logged In" });
    }
});
export default authorize;
