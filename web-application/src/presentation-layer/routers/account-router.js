const express = require('express')
const ERROR_DUPLICATE_EMAIL = "ER_DUP_ENTRY";

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
                res.render("home.hbs")
                return
            }

            res.render("accounts-sign-in.hbs", { error: "Incorrect email or password..." })
        })
    })

    router.get("/sign-up", (req, res) => {
        res.render("accounts-sign-up.hbs")
    })

    router.post("/sign-up", (req, res) => {
        if (req.body.email != req.body.verifyEmail) {
            res.render("accounts-sign-up.hbs", {error: "Email and Verify Email does not match"})
            return
        }

        if (req.body.password != req.body.verifyPassword) {
            res.render("accounts-sign-up.hbs", {error: "Password and Verify Password does not match"})
            return
        }

        accountManager.attemptSignUp(req.body.email, req.body.password, (err, result) => {
            if (err) {
                if (err.code == ERROR_DUPLICATE_EMAIL) {
                    res.render("accounts-sign-up.hbs", {error: "Email is already registered."})
                    return
                }

                res.render("accounts-sign-up.hbs", {error: err})
            }

            if (result) {
                res.render("accounts-sign-up.hbs", {successful: true})
                return
            }
        })
    })


    return router
}