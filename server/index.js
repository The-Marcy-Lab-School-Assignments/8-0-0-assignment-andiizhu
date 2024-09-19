// index.js
const gifs = require("./gif.json"); // mock data from repo
const express = require("express"); // checks if express is in local repo and sets equal to express so we can use it in our project.
const app = express(); // app is created to handle all of the controllers and runs an instance of express (?)

app.get("/", (req, res, next) => {
	res.sendFile(__dirname + "/index.html");
}); // route & controller, `.sendFile` to direct to the path
app.get("/about", (req, res, next) => {
	res.send(`<h1>About<h1>`);
}); // route & controller, `.send` just to send text, in this case HTML.
app.get("/api/name", (req, res, next) => {
	const name = req.query.name || "stranger"; // path needs to be /api/name?name={value} to have an value, else default to "stranger"
	res.send(`hello ${name}`); // `.send` the message
});
app.get("/api/data", (req, res, next) => {
	const filteredValue = req.query.filter || ""; // path needs to be /api/data?=filter={value} to have an value, else default to "";
	const filteredData = gifs.data.filter((gif) =>
		gif.title.toLowerCase().includes(filteredValue)
	); // gifs is an array, data is the endpoint in the `gifs.json file`. Filter the gifs array to find those whose titles (in lowercase) include the filteredValue
	res.send(filteredData); // `.send` the filtered data
});

const port = 4444;
app.listen(port, () =>
	console.log(`Server is now running on http://localhost:${port}`)
);
