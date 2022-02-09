const express = require('express')
const jwt = require("jsonwebtoken")

const TOKEN_EXPIRED_ERROR = "TokenExpiredError"

function authenticateToken(req, res, next) {
    // Authorization header comes in format "Bearer {JWT TOKEN}" 
    const authHeader = req.headers["authorization"]

    // Checks if authHeader exists, if it exists token receives the value from the .split function
    const token = authHeader && authHeader.split(" ")[1]

    console.log(`TOKEN : ${token}`);

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

    router.get("/todos", authenticateToken, (req, res) => {
        todoManager.getAllTodos(req.user.accId, (err, result) => {
            res.status(200).json(result)
        })
    })

    router.post("/add-todo", authenticateToken, (req, res) => {
        console.log(`REQ.body:`);
        console.log(req.body);

        todoManager.addTodo(req.body.title, req.body.description, req.user.accId, (err, result) => {
            if (err) {
                console.log(`ERROR!`);
                console.log(err);
                res.status(400).send({errorMessage: err})
            }

            res.status(200).send()
        })

    })

    return router
}
