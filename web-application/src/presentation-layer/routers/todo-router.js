const express = require('express')

const global = require("../../global.js")
const ERR_DUPLICATE_TITLE = "ER_DUP_ENTRY"


module.exports = function ({ todoManager }) {
    const router = express.Router()

    router.post("/add", global.userIsAuthorized, (req, res) => {
        todoManager.addTodo(req.body.title, req.body.description, req.session.accId, (err, result) => {
            if (err) {
                if (err.code == ERR_DUPLICATE_TITLE) {
                    let state = global.homePageErrorState
                    state.errorHasOccurred = true
                    state.errorMessage = "Title already exists. Please use a different title"
                    state.previousTitle = req.body.title
                    state.previousDescription = req.body.description

                    res.render("home.hbs")
                }
            } else {
                res.render("home.hbs")
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