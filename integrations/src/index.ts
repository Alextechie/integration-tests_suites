import express from "express"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import { userDetails } from "./utils/types";
import { prisma } from "./utils/db";


dotenv.config();

export const app = express();
export const port = process.env.PORT;
const saltRounds = 10;

//middleware
app.use(express.json());


// routes
app.get("/", (req, res) => {
    res.json({ message: "Home route" })
});

app.post("/register", async (req, res): Promise<any> => {
    // fetch the register details and validate the inputs
    // validate the inputs using zod
    const parsedInput = userDetails.safeParse(req.body)

    if (!parsedInput.success) {
        return res.status(411).json({
            message: "Invalid inputs"
        })
    }

    try {
        // check if a user exists
        const checkIfExists = await prisma.user.findUnique({
            where: {
                email: parsedInput.data.email
            }
        })

        if(checkIfExists) {
            return res.json({
                message: "User with this email already exists"
            })
        }

        // hash the password 
        const hashed = await bcrypt.hash(String(parsedInput.data.password), saltRounds);

        // store the user details in the database
        const user = await prisma.user.create({
            data: {
                username: parsedInput.data.username,
                password: hashed
            }
        })

        const answer = user.email;

        res.json({
            result: answer,
            id: user.id
        })
    } catch (err: any) {
        return res.status(500).json({
            message: "Error adding data to the database",
            error: err.message,
            success: false
        })
    }
})
