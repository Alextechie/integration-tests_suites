import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();


// delteti
export default async () => {
    await prisma.$transaction([
        prisma.user.deleteMany()
    ])
}