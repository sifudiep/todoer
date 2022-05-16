const currentDate = new Date()
const UNAUTHORIZED_ERROR_CODE = 401

module.exports = {
    userIsAuthorized: function (req, res, next) {
        if (!req.session || !req.session.isAuth) {
            const err = new Error("You are not authorized!")
            err.statuscode = UNAUTHORIZED_ERROR_CODE
            res.render("home.hbs", {
                errorMessage: "ERROR 401 : You are not authorized! Please login to view/add todos!",
                csrfToken: req.csrfToken(),
                date: ` ${currentDate.toLocaleString('en-US', { weekday: 'short', day: 'numeric', month: "short" })}`,
            })
        }
        next()
    },
    JWTSecretKey: "HejHej123",
    ERROR_DUPLICATE : "ER_DUP_ENTRY",
    ERROR_TIMEOUT : "ETIMEDOUT",
}
