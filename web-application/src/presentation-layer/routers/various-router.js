const express = require('express')

const currentDate = new Date()

module.exports = function({todoManager}) {
    const router = express.Router()

    router.get("/", (req, res) => {
        todoManager.getAllTodos(req.session.accId, (err, todos) => {
            res.render("home.hbs", {
                todos,
                date: ` ${currentDate.toLocaleString('en-US', { weekday: 'short', day: 'numeric', month: "short"})}`,
                errMessage: req.session.isAuth ? "" : "Error 401 : User is not authenticated!",
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
