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
exports.login = exports.signup = void 0;
const users_1 = __importDefault(require("../models/users"));
const users_2 = require("../models/users");
// ! import the jwt creation and verification utilities 
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('POSTING!', req.body);
        const user = yield users_1.default.create(req.body);
        res.send(user);
    }
    catch (e) {
        console.log(e);
        res.send("Signup failed");
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const incomingData = req.body;
    const incomingPassword = req.body.password;
    const incomingEmail = req.body.email;
    // check if email belongs to an existing user in our database
    const foundUser = yield users_1.default.findOne({ email: incomingEmail });
    if (!foundUser) {
        return res.send({ message: "login failed. User not found" });
    }
    // check if the password is correct.
    const isValidPw = (0, users_2.validatePassword)(incomingPassword, foundUser.password);
    if (isValidPw) {
        // ! Issues a unique jwt for this user
        const token = jsonwebtoken_1.default.sign({ userId: foundUser._id, email: foundUser.email }, // base64-compressed payload: anything you want
        "This is a very secret string only we know", // a secret only known to srv
        { expiresIn: '24h' } // an expiry of the token
        );
        res.send({ message: "Login successful", token });
    }
    else {
        res.status(401).send({ message: "Login failed. Check credentials and try again!" });
    }
});
exports.login = login;
