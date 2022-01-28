const express = require('express')

const router = express.Router()

router.get("/", function(request, response){
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

	response.render("home.hbs", {
		todos
	})
})

router.get("/about", function(request, response){
	response.render("about.hbs")
})

router.get("/contact", function(request, response){
	response.render("contact.hbs")
})

module.exports = router