const express = require('express')
const User = require('./users/model')

const server = express()

server.use(express.json())

//GET 
server.get('/', (req, res) => {
    res.status(200).json({ message: "pauline is here" });
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
