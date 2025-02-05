import { z } from "zod";

export const userDetails = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.number()
});