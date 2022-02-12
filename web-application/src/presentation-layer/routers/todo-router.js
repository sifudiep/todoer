const express = require('express')

const helperFunctions = require("../../helperFunctions.js")


module.exports = function ({ todoManager }) {
    const router = express.Router()

    router.post("/add", helperFunctions.userIsAuthorized, (req, res) => {
        todoManager.addTodo(req.body.title, req.body.description, req.session.accId, (err, result) => {
            res.render("home.hbs")
        })
    })

    router.post("/delete", helperFunctions.userIsAuthorized, (req, res) => {
        todoManager.deleteTodo(req.session.accId, req.body.title, (err, result) => {
            res.render("home.hbs")
        })
    })

    return router
}