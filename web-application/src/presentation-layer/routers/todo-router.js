const express = require('express')

module.exports = function({todoManager}) {
    const router = express.Router()
    
    router.post("/add", (req, res) => {
        todoManager.addTodo(req.body.title, req.body.description, req.session.accId)

        res.render("home.hbs")
    })

    return router
}