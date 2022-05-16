const express = require('express')
const global = require("../../global.js")

module.exports = function ({ todoManager }) {
    const router = express.Router()

    router.get("/add-todo", (req, res) => {
        res.render("add-todo.hbs", {csrfToken : req.csrfToken()})
    })

    router.post("/add-todo", global.userIsAuthorized, (req, res) => {
        todoManager.addTodo(req.body.title, req.body.description, req.session.accId, (err, result) => {
            if (err) {
                res.render("add-todo.hbs", {
                    errorMessage : err,
                    csrfToken : req.csrfToken(),
                    previousTitle : result.previousTitle,
                    previousDescription : result.previousDescription
                })
            } else {
                res.render("add-todo.hbs", {
                    csrfToken : req.csrfToken(),
                    successful : true
                })
            }
        })
    })

    router.post("/delete", global.userIsAuthorized, (req, res) => {
        todoManager.deleteTodo(req.session.accId, req.body.title, (err, result) => {
            res.render("home.hbs")
        })
    })

    return router
}