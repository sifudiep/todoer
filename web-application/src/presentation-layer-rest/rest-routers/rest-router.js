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
        res.setHeader("WWW-Authenticate", "Bearer realm='localhost:8000'")
        res.sendStatus(401)
        return
    }

    jwt.verify(token, global.JWTSecretKey, (err, user) => {
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

    router.get("/todo", authenticateToken, (req, res) => {
        todoManager.getAllTodos(req.user.accId, (err, result) => {
            res.status(200).json(result)
        })
    })

    router.post("/todo", authenticateToken, (req, res) => {
        todoManager.addTodo(req.body.title, req.body.description, req.user.accId, (err, result) => {
            if (err) {
                res.status(409).send({errorMessage: err})
            }

            res.status(200).send()
        })
    })

    router.delete("/todo", authenticateToken, (req, res) => {
        todoManager.deleteTodo(req.user.accId, req.body.title, (err, result) => {
            res.status(200).send()
        })
    })

    return router
}
