var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Testimonial from "../models/testimonial.model";
export const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            res.status(400).json({ message: "All Fields are required" });
            return;
        }
        const testimonial = yield Testimonial.create({ name, email, message, profileImage: (_a = req.users) === null || _a === void 0 ? void 0 : _a.profileImage, rating: (Math.floor(Math.random() * 4) + 1), user: (_b = req.users) === null || _b === void 0 ? void 0 : _b._id });
        res.status(201).json(testimonial);
    }
    catch (error) {
        console.log("error in create testimonial controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
export const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        Testimonial.find({}).select("-user").then((data) => {
            const count = data.length;
            console.log(data);
            console.log(count);
            if (count === 0) {
                res.status(500).json({ message: "No Testimonials Yet" });
                return;
            }
            if (count <= 15) {
                res.status(200).json(data);
                return;
            }
            const resData = [];
            let limitedCount = 15;
            let generatedNum = [];
            for (let i = 0; i < limitedCount; i++) {
                const num = Math.floor(Math.random() * count);
                if (generatedNum.filter((number, i) => number === num)) {
                    limitedCount++;
                    return;
                }
                generatedNum.push(num);
                resData.push(data[num]);
            }
            res.status(200).json(resData);
        });
    }
    catch (error) {
        console.log("error in testimonial create controller", error);
        res.status(500).json({ message: "Internal server Error" });
    }
});
