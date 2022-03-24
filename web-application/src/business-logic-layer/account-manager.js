const accountValidator = require("./account-validator")

module.exports = function({accountRepository}) {
    return {
        getAllAccounts: function(callback){
            accountRepository.getAllAccounts(callback)
        },
        getAccountByEmail: function(email, callback){
            accountRepository.getAccountByEmail(email, callback)
        },
        attemptSignIn: function(email, password, callback) {
            let errors = accountValidator.getErrorsEmailAndPassword(email, password)

            if (errors.length > 0) {
                callback(errors[0], null)
                return
            }
            accountRepository.attemptSignIn(email, password, callback)
        },
        attemptSignUp: function(email, password, callback) {
            let errors = accountValidator.getErrorsEmailAndPassword(email, password)

            if (errors.length > 0) {
                callback(errors[0], null)
                return
            }

            accountRepository.attemptSignUp(email, password, callback)
        }
    }
}