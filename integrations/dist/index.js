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
exports.port = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const types_1 = require("./utils/types");
const db_1 = require("./utils/db");
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.port = process.env.PORT;
const saltRounds = 10;
//middleware
exports.app.use(express_1.default.json());
// routes
exports.app.get("/", (req, res) => {
    res.json({ message: "Home route" });
});
exports.app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // fetch the register details and validate the inputs
    // validate the inputs using zod
    const parsedInput = types_1.userDetails.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(411).json({
            message: "Invalid inputs"
        });
    }
    try {
        // check if a user exists
        const checkIfExists = yield db_1.prisma.user.findUnique({
            where: {
                email: parsedInput.data.email
            }
        });
        if (checkIfExists) {
            return res.json({
                message: "User with this email already exists"
            });
        }
        // hash the password 
        const hashed = yield bcrypt_1.default.hash(String(parsedInput.data.password), saltRounds);
        // store the user details in the database
        const user = yield db_1.prisma.user.create({
            data: {
                username: parsedInput.data.username,
                email: parsedInput.data.email,
                password: hashed
            }
        });
        return res.status(201).json({
            message: "User created",
            data: user,
            success: true
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Error adding data to the database",
            error: err.message,
            success: false
        });
    }
}));
