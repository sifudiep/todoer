const express = require('express')
const global = require("../../global.js")

module.exports = function ({ todoManager }) {
    const router = express.Router()

    router.get("/add-todo", (req, res) => {
        res.render("add-todo.hbs", {csrfToken : req.csrfToken()})
    })

    router.post("/add-todo", (req, res) => {
        todoManager.addTodo(req.body.title, req.body.description, req.session, (err, result) => {
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

    router.post("/delete/:id", (req, res) => {
        todoManager.deleteTodo(req.session, req.params.id, (err) => {
            if (err) {
                res.render("home.hbs", {
                    errorMessage : err
                })
                return
            }
            res.redirect(global.DesktopSiteURL)
        })
    })

    return router
}