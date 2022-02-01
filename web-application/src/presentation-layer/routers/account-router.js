const express = require('express')

module.exports = function ({ accountManager }) {
    const router = express.Router()

    router.get("/sign-in", (req, res) => {
        res.render("accounts-sign-in.hbs")
    })

    router.post("/sign-in", (req, res) => {
        accountManager.attemptSignIn(req.body.email, req.body.password, (err, result) => {
            if (err) {
                console.log(`ERR:`);
                console.log(err)
            }

            if (result.didSignIn) {
                req.session.isAuth = true
                req.session.accId = result.accId
                console.log(req.sessionID);
                res.render("home.hbs")
                return
            }

            res.render("accounts-sign-in.hbs", { error: "Incorrect email or password..." })
        })
    })

    router.post("/add-todo", (req, res) => {
        accountManager.addTodo(req.body.title, req.body.description, req.session.accId)

        res.render("home.hbs")
    })

    router.get("/add-todo", (req, res) => {
        console.log(`GET add-todo`);
    })

    return router
}