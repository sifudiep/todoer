const express = require('express')
const { homePageErrorState } = require('../../global.js')

const currentDate = new Date()

const global = require("../../global.js")


module.exports = function({todoManager}) {
    const router = express.Router()

    router.get("/", global.userIsAuthorized, (req, res) => {
        todoManager.getAllTodos(req.session.accId, (err, todos) => {
            if (global.homePageErrorState.errorHasOccurred) {
                res.render("home.hbs", {
                    todos,
                    date: ` ${currentDate.toLocaleString('en-US', { weekday: 'short', day: 'numeric', month: "short"})}`,
                    csrfToken : req.csrfToken(),
                    errorMessage: homePageErrorState.errorMessage,
                    previousTitle: homePageErrorState.previousTitle,
                    previousDescription: homePageErrorState.previousDescription
                })
                
                global.homePageErrorState.errorHasOccurred = false
            } else {
                res.render("home.hbs", {
                    todos,
                    date: ` ${currentDate.toLocaleString('en-US', { weekday: 'short', day: 'numeric', month: "short"})}`,
                    csrfToken : req.csrfToken()
                })
            }
        })
    })
    
    router.get("/about", (req, res) => {        
        res.render("about.hbs")
    })
    
    router.get("/contact", (req, res) => {
        res.render("contact.hbs")
    })

    return router
}
