const express = require('express');
const userRoutes = require('./users-router');
const server = express()


server.use('/api/users', userRoutes)

server.use('/', (req, res) => {
    res.json("Server is running!")
})

module.exports = server