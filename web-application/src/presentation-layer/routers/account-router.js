const express = require('express')

module.exports = function ({ accountManager }) {
    const router = express.Router()

    router.get("/sign-in", (req, res) => {
        res.render("accounts-sign-in.hbs", { csrfToken: req.csrfToken() })
    })

    router.post("/sign-in", (req, res) => {
        accountManager.attemptSignIn(req.body.email, req.body.password, (err, result) => {
            if (err) {
                res.render("accounts-sign-in.hbs", { errorMessage: err, csrfToken: req.csrfToken(), previousEmail: req.body.email })
            }

            if (result.didSignIn) {
                req.session.isAuth = true
                req.session.accId = result.accId
                res.render("home.hbs", { csrfToken: req.csrfToken() })
            }
        })
    })

    router.get("/sign-up", (req, res) => {
        res.render("accounts-sign-up.hbs", { csrfToken: req.csrfToken() })
    })

    router.post("/sign-up", (req, res) => {
        accountManager.attemptSignUp(req.body.email, req.body.verifyEmail, req.body.password, req.body.verifyPassword, (err, signUpSuccessful) => {
            if (err) {
                res.render("accounts-sign-up.hbs", {
                    errorMessage: err,
                    csrfToken: req.csrfToken(),
                    previousEmail: req.body.email,
                    previousVerifyEmail: req.body.verifyEmail
                })
            }

            if (signUpSuccessful) {
                res.render("accounts-sign-up.hbs", {
                    successful: true,
                    csrfToken: req.csrfToken()
                })
            }
        })
    })


    return router
}