const express = require('express')
const jwt = require("jsonwebtoken")

const TOKEN_EXPIRED_ERROR = "TokenExpiredError"

function authenticateToken(req, res, next) {
    // Authorization header comes in format "Bearer {JWT TOKEN}" 
    const authHeader = req.headers["authorization"]

    // Checks if authHeader exists, if it exists token receives the value from the .split function
    const token = authHeader && authHeader.split(" ")[1]

    if (token == null) {
        res.setHeader("WWW-Authenticate", "Bearer realm='localhost:8000'")
        res.sendStatus(401)
        return
    }

    jwt.verify(token, "lolz", (err, user) => {
        if (err) {
            if (err.name == TOKEN_EXPIRED_ERROR) {
                res.setHeader("WWW-Authenticate", "Bearer realm='localhost:8000',err='invalid_token', err_description='The access token expired'")
                res.sendStatus(401)
                return
            }
            res.setHeader("WWW-Authenticate", "Bearer realm='localhost:8000',err='invalid_token', err_description='Access token is not a valid token.'")
            res.sendStatus(401)
            return
        }
        if (user) {
            req.user = user
            next()
            return
        }
    })
}

module.exports = function ({ todoManager }) {
    const router = express.Router()

    router.post("/todos", authenticateToken, (req, res) => {
        res.sendStatus(200)
    })

    return router
}
