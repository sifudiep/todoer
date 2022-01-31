const express = require('express')
const accountManager = require('../../business-logic-layer/account-manager')

const router = express.Router()

router.get("/", (req, res) => {
    accountManager.getAllTodos(req.session.accId, (err, todos) => {
        res.render("home.hbs", {
            todos
        })
    })

	
})

router.get("/about", (req, res) => {
	res.render("about.hbs")
})

router.get("/contact", (req, res) => {
	res.render("contact.hbs")
})


module.exports = router