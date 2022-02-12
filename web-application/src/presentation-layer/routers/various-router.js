const express = require('express')

const currentDate = new Date()

const helperFunctions = require("../../helperFunctions.js")


module.exports = function({todoManager}) {
    const router = express.Router()

    router.get("/", helperFunctions.userIsAuthorized, (req, res) => {
        todoManager.getAllTodos(req.session.accId, (err, todos) => {
            res.render("home.hbs", {
                todos,
                date: ` ${currentDate.toLocaleString('en-US', { weekday: 'short', day: 'numeric', month: "short"})}`,
                csrfToken : req.csrfToken()
            })
        })
    })
    
    router.get("/about", (req, res) => {        
        res.render("about.hbs")
    })
    
    router.get("/contact", (req, res) => {
        res.render("contact.hbs")
    })

    return router
}
