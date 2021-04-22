const request = require('supertest');
const server = require('./server');

describe("Users tests", () => {
    it("sanity check", () => {
        expect(1).toBe(1)
    })
    describe("index route", () => {
        it("server is running", async () => {
            const response = await request(server).get('/')
            expect(response.status).toBe(200)
        })
    })
})