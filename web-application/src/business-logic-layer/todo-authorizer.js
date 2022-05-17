exports.userIsAuthorized = function (session) {
    if (!session || !session.isAuth) {
        return false
    }

    return true
}