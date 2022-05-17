const currentDate = new Date()
const UNAUTHORIZED_ERROR_CODE = 401

module.exports = {
    userIsAuthorized: function (session) {
        if (!session || !session.isAuth) {
            return false
        }

        return true
    },
    JWTSecretKey: "HejHej123",
    ERROR_DUPLICATE : "ER_DUP_ENTRY",
    ERROR_TIMEOUT : "ETIMEDOUT",
    DesktopSiteURL : "http://localhost:8000"
}
