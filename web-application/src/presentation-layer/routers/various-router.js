const express = require('express')

const router = express.Router()

router.get("/", (req, res) => {
	let todos = [
		{
			title: "this is the title....",
			description: "this is the description..."
		},
		{
			title: "do the laundry",
			description: "just do it man..."
		},
		{
			title: "do the laundry"
		}
	]

	res.render("home.hbs", {
		todos
	})
})

router.get("/about", (req, res) => {
	res.render("about.hbs")
})

router.get("/contact", (req, res) => {
	res.render("contact.hbs")
})

module.exports = router