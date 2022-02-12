const express = require('express')
const ERROR_DUPLICATE_EMAIL = "ER_DUP_ENTRY";

module.exports = function ({ accountManager }) {
    const router = express.Router()

    router.get("/sign-in", (req, res) => {
        res.render("accounts-sign-in.hbs", {csrfToken: req.csrfToken()})
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
                res.render("home.hbs", {csrfToken: req.csrfToken()})
                return
            }

            res.render("accounts-sign-in.hbs", { error: "Incorrect email or password...", csrfToken: req.csrfToken()})
        })
    })

    router.get("/sign-up", (req, res) => {
        res.render("accounts-sign-up.hbs", {csrfToken: req.csrfToken()})
    })

    router.post("/sign-up", (req, res) => {
        if (req.body.email != req.body.verifyEmail) {
            res.render("accounts-sign-up.hbs", {error: "Email and Verify Email does not match", csrfToken: req.csrfToken()})
            return
        }

        if (req.body.password != req.body.verifyPassword) {
            res.render("accounts-sign-up.hbs", {error: "Password and Verify Password does not match", csrfToken: req.csrfToken()})
            return
        }

        accountManager.attemptSignUp(req.body.email, req.body.password, (err, result) => {
            if (err) {
                if (err.code == ERROR_DUPLICATE_EMAIL) {
                    res.render("accounts-sign-up.hbs", {error: "Email is already registered.", csrfToken: req.csrfToken()})
                    return
                }

                res.render("accounts-sign-up.hbs", {error: err, csrfToken: req.csrfToken()})
            }

            if (result) {
                res.render("accounts-sign-up.hbs", {successful: true, csrfToken: req.csrfToken()})
                return
            }
        })
    })


    return router
}