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

describe("Users model tests", () => {
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

            await Users.add(merry)
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
    describe("delete function", () => {
        it("deletes the correct entry", async () => {
            let array
            await Users.add(pippin)
            array = await db('users')
            expect(array).toHaveLength(1)

            await Users.add(merry)
            array = await db('users')
            expect(array).toHaveLength(2)

            const pip = array[0]
            await Users.remove(pip.user_id)
            array = await db('users')
            expect(array).toHaveLength(1)
        })
    })
})

describe("Users router tests", () => {
    describe("POST endpoint", () => {
        it("returns 201 status code", async () => {
            let response
            response = await request(server).post('/api/users').send(pippin)
            expect(response.status).toBe(201)
        })
        it("returns the data of the new user", async () => {
            let response
            response = await request(server).post('/api/users').send(pippin)
            expect(response.body).toMatchObject({user_id:1, ...pippin})
        })
    })
    describe("DELETE endpoint", () => { 
        it("runs proper method", async () => {
            let response
            await Users.add(pippin)
            response = await request(server).delete('/api/users').send('1')
            expect(response.req.method).toBe("DELETE")
        })
        it("actually deletes the user", async () => {
            let array
            await Users.add(pippin)
            array = await db('users')
            expect(array).toHaveLength(1)

            await Users.add(merry)
            array = await db('users')
            expect(array).toHaveLength(2)

            let response = await request(server).delete('/api/users/1')
            expect(response.body).toBe("User deleted successfully")
        })
    })
})