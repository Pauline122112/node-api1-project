const express = require('express')
const User = require('./users/model')

const server = express()

server.use(express.json())

//GET 
server.get('/', (req, res) => {
    res.status(200).json({ message: "pauline is here" });
})

//GET users

server.get("/api/users", (req, res) => {
	User.find()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((err) => {
			console.log(err);
			res
				.status(500)
				.json({
					message: err.message,
					customMessage: "The users information could not be retrieved",
				});
		});
	// res.json("Returns an array users.");
});

server.get("/api/users/:id", async (req, res) => {
	try {
		const { id } = req.params;
		console.log(id);
		const user = await User.findById(id);
		console.log(user);
		if (!user) {
			res.status(404).json({
				message: `message: "The user with the specified ID does not exist`,
			})
		} else {
			res.status(200).json(user);
		}
	} catch (err) {
		console.log(err);
		res
			.status(500)
			.json({
				message: err.message,
				customMessage: "The user information could not be retrieved",
			});
	}
});


//POST
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


//PUT
server.put('/api/users/:id', async (req, res) => {
   try {
       const { name, bio } = req.body
       const { id } = req.params

       if (!name || !bio) {
           res.status(400).json({
               message: `Please provide name and bio for the user`,
           })
       } else {
           const updateUser = await User.update(id, {name, bio})
           if (!updateUser) {
               res.status(404).json({
                   message: `The user with the specified ID does not exist`,
               })
           } else {
               res.json(updateUser)
           }
       }
   } catch (err) {
       res.status(500).json({
					message: err.message,
					customMessage: `The user information could not be modified`,
				});
   }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
