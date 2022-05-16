const express = require('express')
const jwt = require("jsonwebtoken")
const global = require("../../global")

const JWT_EXPIRATION_TIME = 60 * 60 // 1 HOUR

module.exports = function ({ accountManager }) {
    const router = express.Router()


    router.post("/token", (req, res) => {
        // TODO Store PRIVATE_KEY in a more secure way.
        accountManager.attemptSignIn(req.body.username, req.body.password, (err, account) => {
            if (err) {
                res.status(401).json({ err: err })
            }
            if (account) {
                const PRIVATE_KEY = global.JWTSecretKey

                const accessTokenPayload = {
                    accId: account.accId,
                    email: account.email,
                    grant_type: req.body.grant_type
                }

                const idTokenPayload = {
                    iss: "http://localhost:8080",
                    sub: account.email,
                    aud: "http://localhost:80",
                    iat: new Date().getTime() / 1000,
                }

                jwt.sign(accessTokenPayload, PRIVATE_KEY, { expiresIn: JWT_EXPIRATION_TIME }, (err, accessToken) => {
                    jwt.sign(idTokenPayload, PRIVATE_KEY, { expiresIn: JWT_EXPIRATION_TIME }, (err, idToken) => {
                        const result = {
                            accessToken,
                            idToken
                        }
                        res.send(JSON.stringify(result))
                    })
                })
            }
        })
    })



    return router
}
