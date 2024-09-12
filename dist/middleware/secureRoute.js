"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = __importDefault(require("../models/users"));
function secureRoute(req, res, next) {
    // ! Check if there's a token? If there's no authorization token, reject 
    const rawToken = req.headers.authorization;
    if (!rawToken) {
        return res.status(401).json({ message: "Unauthorized. No Auth header found" });
    }
    // ! Use the string.replace method to go from "Bearer thisismyjwt" to "thisismyjwt"
    const token = rawToken.replace("Bearer ", "");
    // ! Let's verify if this is a legit jwt(keyfob) and which user it is (via jwt payload)
    // ? jwt.verify first argument is the jwt token
    // ? the secret with which we had issued the jwt (in jwt.sign method)
    // ? callback function which lets us check for errors + move on if necessary
    //      - in the callback we must specify two variables
    //      - the first argument will be filled in with any erors (if any)
    //      - the second argument will be filled in with the payload
    jsonwebtoken_1.default.verify(token, "This is a very secret string only we know", (err, payload) => __awaiter(this, void 0, void 0, function* () {
        if (err || !payload) {
            return res.status(401).json({ message: "Unauthorized. Invalid JWT." });
        }
        console.log("Valid token! The payload is:", payload);
        const jwtPayload = payload;
        const userId = jwtPayload.userId;
        const user = yield users_1.default.findById(userId);
        if (!user) {
            return res.status(401).json({ message: "User not found. Invalid JWT!" });
        }
        // ! We shall attach the user info (from the paylod) to the "req" request object, so that
        // ! our delete route handler (and other privileged route handlers can) can make use of it
        req.currentUser = user;
        next(); // the request moves on to the next middleware in the chain
    }));
}
exports.default = secureRoute;
