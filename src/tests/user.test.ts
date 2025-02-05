import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest"
import { app } from "..";
import resetDb from "./helpers/reset-db";

describe('/POST /register', () => {
    beforeAll(async () => {
        console.log("Clearing the Db")
        await resetDb()
    })
    it('should add users to a db', async () => {
        const {body, status} = await request(app).post("/register").send({
            username: "Alex",
            email: "nganga254@gmail.com",
            password: 41484877
        })

        expect(status).toBe(200)
        expect(body).toEqual({result: "nganga254@gmail.com", id: expect.any(Number)})
    })
})