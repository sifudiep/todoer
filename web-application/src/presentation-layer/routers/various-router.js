const express = require('express')

module.exports = function({accountManager}) {
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

    return router
}
