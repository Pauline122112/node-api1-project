const server = require('./api/server');

const port = 5000;
console.log("listening on port 5000");
// START YOUR SERVER HERE

server.use("*", (req, res) => {
	res.status(404).json({ message: "sorry, not found!" });
});

server.listen(port, () => {
	console.log(`listening on, ${port}`);
});
