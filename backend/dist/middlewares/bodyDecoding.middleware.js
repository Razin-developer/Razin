var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function decodeBody(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        if (!body) {
            next();
        }
        const newBody = {};
        // Mapping from environment variables
        const envMap = {
            A: process.env.A,
            B: process.env.B,
            C: process.env.C,
            D: process.env.D,
            E: process.env.E,
            F: process.env.F,
            G: process.env.G,
            H: process.env.H,
            I: process.env.I,
            J: process.env.J,
            K: process.env.K,
            L: process.env.L,
            M: process.env.M,
            N: process.env.N,
            O: process.env.O,
            P: process.env.P,
            Q: process.env.Q,
            R: process.env.R,
            S: process.env.S
        };
        // Convert request body keys to their corresponding environment variable names
        Object.keys(body).forEach((key) => {
            const newKey = envMap[key]; // Get mapped key from env variables
            if (newKey) {
                newBody[newKey] = body[key]; // Assign value correctly
            }
        });
        console.log(newBody); // For debugging
        req.body = newBody; // Replace request body with the new structured object
        next(); // Call next middleware
    });
}
