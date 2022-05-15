const express = require('express')
const ERROR_DUPLICATE_EMAIL = "ER_DUP_ENTRY";

module.exports = function ({ accountManager }) {
    const router = express.Router()

    router.get("/sign-in", (req, res) => {
        res.render("accounts-sign-in.hbs", { csrfToken: req.csrfToken() })
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
                res.render("home.hbs", { csrfToken: req.csrfToken() })
                return
            }

            res.render("accounts-sign-in.hbs", { errorMessage: "Incorrect email or password...", csrfToken: req.csrfToken(), previousEmail: req.body.email })
        })
    })

    router.get("/sign-up", (req, res) => {
        res.render("accounts-sign-up.hbs", { csrfToken: req.csrfToken() })
    })

    router.post("/sign-up", (req, res) => {
        if (req.body.email != req.body.verifyEmail) {
            res.render("accounts-sign-up.hbs",
                {
                    errorMessage: "Email and Verify Email does not match",
                    csrfToken: req.csrfToken(),
                    previousEmail: req.body.email,
                    previousVerifyEmail: req.body.verifyEmail
                })
            return
        }

        if (req.body.password != req.body.verifyPassword) {
            res.render("accounts-sign-up.hbs", {
                errorMessage: "Password and Verify Password does not match",
                csrfToken: req.csrfToken(),
                previousEmail: req.body.email,
                previousVerifyEmail: req.body.verifyEmail
            })
            return
        }

        accountManager.attemptSignUp(req.body.email, req.body.password, (err, result) => {
            if (err) {
                if (err.code == ERROR_DUPLICATE_EMAIL) {
                    res.render("accounts-sign-up.hbs", {
                        errorMessage: "Email is already registered.",
                        csrfToken: req.csrfToken(),
                        previousEmail: req.body.email,
                        previousVerifyEmail: req.body.verifyEmail
                    })
                    return
                }

                res.render("accounts-sign-up.hbs", {
                    errorMessage: err,
                    csrfToken: req.csrfToken(),
                    previousEmail: req.body.email,
                    previousVerifyEmail: req.body.verifyEmail
                })
            }

            if (result) {
                res.render("accounts-sign-up.hbs", {
                    successful: true,
                    csrfToken: req.csrfToken(),
                    previousEmail: "",
                    previousVerifyEmail: ""
                })
                return
            }
        })
    })


    return router
}