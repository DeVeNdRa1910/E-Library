"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const node_path_1 = __importDefault(require("node:path"));
//3e7 30mb -> 3 to the power 7
const upload = (0, multer_1.default)({
    dest: node_path_1.default.resolve(__dirname, "../../public/data/uploads"),
    limits: { fileSize: 1024 * 1024 * 10 }, // 10mb 10 * 1024 * 1024 cluodinary pr 10md se jyada allow nahi hai free plane me
});
exports.default = upload;
