const request = require('supertest');
const Users = require('./users-model');
const db = require('../data/db-config');
const server = require('./server');

const merry = {username: "merry", password: "111"}
const pippin = {username: "pippin", password: "000"}

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db('users').truncate();
})

afterAll(async () => {
    await db.destroy()
})

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
    describe("add function", () => {
        it("adds a user", async () => {
            let array
            await Users.add(pippin)
            array = await db('users')
            expect(array).toHaveLength(1)

            await Users.add(pippin)
            array = await db('users')
            expect(array).toHaveLength(2)
        })
        it("added data has correct format", async () => {
            let array
            await Users.add(pippin)
            array = await db('users')

            await Users.add(merry)
            array = await db('users')
            expect(array[0]).toMatchObject({user_id:1, ...pippin})
            expect(array[1]).toMatchObject({user_id:2, ...merry})
        })
    })
})