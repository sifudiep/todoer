const { response } = require('express')
const express = require('express')
const jwt = require("jsonwebtoken")

const JWT_EXPIRATION_TIME = 60 * 60 // 1 HOUR

module.exports = function ({ accountManager }) {
    const router = express.Router()


    router.post("/sign-in", (req, res) => {
        // TODO Store PRIVATE_KEY in a more secure way.
        accountManager.attemptSignIn(req.query.username, req.query.password, (err, account) => {
            if (err) {
                res.status(401).json({ err: err })
            }
            if (account) {
                const PRIVATE_KEY = "lolz"
                let payload = {
                    accId: account.accId,
                    email: account.email
                }

                jwt.sign(payload, PRIVATE_KEY, { expiresIn: JWT_EXPIRATION_TIME }, (err, token) => {
                    let result = {
                        jwt: token
                    }

                    res.send(JSON.stringify(result))
                })
            }
        })
    })



    return router
}
