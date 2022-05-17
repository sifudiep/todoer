const express = require('express')
const jwt = require("jsonwebtoken")

const TOKEN_EXPIRED_ERROR = "TokenExpiredError"
const global = require("../../global")

function authenticateToken(req, res, next) {
    // Authorization header comes in format "Bearer {JWT TOKEN}" 
    const authHeader = req.headers["authorization"]

    // Checks if authHeader exists, if it exists token receives the value from the .split function
    const token = authHeader && authHeader.split(" ")[1]

    if (token == null) {
        res.setHeader(`WWW-Authenticate`, `Bearer realm='${global.DesktopSiteURL}'`)
        res.sendStatus(401)
        next()
        return
    }

    jwt.verify(token, global.JWTSecretKey, (err, user) => {
        if (err) {
            if (err.name == TOKEN_EXPIRED_ERROR) {
                res.setHeader(`WWW-Authenticate`, `Bearer realm='${global.DesktopSiteURL}',err='invalid_token', err_description='The access token expired'`)
                res.sendStatus(401)
            } else {
                res.setHeader(`WWW-Authenticate`, `Bearer realm='${global.DesktopSiteURL}',err='invalid_token', err_description='Access token is not a valid token.'`)
                res.sendStatus(401)
            }

        }
        if (user) {
            req.session = {
                isAuth : true,
                accountId : user.accountId,
                user
            }
        }

        next()
        return
    })
}

module.exports = function ({ todoManager }) {
    const router = express.Router()

    router.get("/todo", authenticateToken, (req, res) => {
        todoManager.getAllTodos(req.session, (err, result) => {
            if (err) {
                res.status(err.code).send({errorMessage: err.message})
            } else {
                res.status(200).json(result)
            }
        })
    })

    router.post("/todo", authenticateToken, (req, res) => {
        todoManager.addTodo(req.body.title, req.body.description, req.session, (err, result) => {
            if (err) {
                res.status(err.code).send({errorMessage: err.message})
            } else {
                res.status(200).send()
            }
        })
    })

    router.delete("/todo", authenticateToken, (req, res) => {
        todoManager.deleteTodo(req.body.id, req.session, (err) => {
            if (err) {
                res.status(err.code).send({errorMessage: err.message})
            } else {
                res.status(200).send()
            }
        })
    })

    return router
}
