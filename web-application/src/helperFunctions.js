const currentDate = new Date()

module.exports = {
    userIsAuthorized: function(req, res, next) {
        if (!req.session || !req.session.isAuth) {
            const err = new Error("You are not authorized!")
            err.statuscode = 401
            res.render("home.hbs", { 
                errorMessage: "ERROR 401 : You are not authorized! Please login to view/add todos!", 
                csrfToken: req.csrfToken(),
                date: ` ${currentDate.toLocaleString('en-US', { weekday: 'short', day: 'numeric', month: "short"})}`,
            })
        }
        next()
    }
}