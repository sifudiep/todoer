const express = require('express')

const currentDate = new Date()
const global = require("../../global.js")


module.exports = function({todoManager}) {
    const router = express.Router()

    router.get("/", (req, res) => {
        todoManager.getAllTodos(req.session, (err, todos) => {
            console.log(err);
            res.render("home.hbs", {
                todos,
                errorMessage : err ? err.message : null,
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
