"use strict";
// * This file is responsible for defining your own model (type) for your data (movie)
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const movieSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    year: { type: Number, required: true },
    image: { type: String, required: true }
});
exports.default = mongoose_1.default.model('Movie', movieSchema);
