const express = require('express')
const { Cookie } = require('express-session')

module.exports = function({todoManager}) {
    const router = express.Router()

    router.get("/", (req, res) => {
        todoManager.getAllTodos(req.session.accId, (err, todos) => {
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

    return router
}
