const express = require("express");
const path = require("node:path");
const app = express();
const PORT = process.env.PORT;

const messages = [
	{
		text: "Hi there!",
		user: "Amando",
		added: new Date(),
	},
	{
		text: "Hello World!",
		user: "Charles",
		added: new Date(),
	},
];

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => res.render("index", { messages: messages }));
app.get("/new", (req, res) => res.render("form"));
app.post("/new", (req, res) => {
	const { messagetext, username } = req.body;
	messages.push({
		text: messagetext,
		user: username,
		added: new Date(),
	});
	res.redirect("/");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
