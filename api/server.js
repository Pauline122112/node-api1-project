const express = require('express')
const User = require('./users/model')

const server = express()

server.use(express.json())

//GET 
server.get('/', (req, res) => {
    res.status(200).json({ message: "pauline is here" });
})


server.post('/api/users', async (req, res) => {
    try {
        const { name, bio } = req.body
        if ( !name || !bio ) {
            res.status(400).json({
							message: "Please provide name and bio for the user",
						});
        } else {
            const newUser = await User.insert({
                name, bio
            })
            console.log(newUser)
            res.status(201).json(newUser)
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
            customMessage: 'something happened that is not right'
        })
    }
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
