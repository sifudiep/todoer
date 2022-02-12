const express = require('express')

function userIsAuthorized(req, res, next) {
    if (!req.session || !req.session.isAuth) {
        const err = new Error("You are not authorized!")
        err.statuscode = 401
        res.render("home.hbs", {errMessage : "ERROR 401 : You are not authorized! \n Please login to view/add todos!"})

    }

    next()
}


module.exports = function({todoManager}) {
    const router = express.Router()
    
    router.post("/add", userIsAuthorized, (req, res) => {
        todoManager.addTodo(req.body.title, req.body.description, req.session.accId, (err, result) => {
            res.render("home.hbs")
        })
    })

    router.post("/delete", userIsAuthorized, (req, res) => {
        todoManager.deleteTodo(req.session.accId, req.body.title, (err, result) => {
            res.render("home.hbs")
        })
    })

    return router
}