const { response } = require('express')
const express = require('express')
const jwt = require("jsonwebtoken")

const JWT_EXPIRATION_TIME = 60 * 60 * 3

module.exports = function ({ accountManager }) {
    const router = express.Router()

    router.post("/sign-in", (req, res) => {
        // TODO Store PRIVATE_KEY in a more secure way.
        accountManager.attemptSignIn(req.query.username, req.query.password, (err, account) => {
            if (err) console.log(err)
            if (account) {
                // TODO SEND BACK Access Token for user's resources

                const PRIVATE_KEY = "lolz"

                let payload = {
                    accId: "1",
                    name: "mikael"
                }

                jwt.sign(payload, PRIVATE_KEY, {expiresIn: JWT_EXPIRATION_TIME}, (err, token) => {
                    console.log(`Token was signed : ${token}`)

                    console.log(`req.body: ${req.body}`);
                    console.log(req.query);
                    
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
