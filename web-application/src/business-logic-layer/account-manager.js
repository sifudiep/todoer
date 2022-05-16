const accountValidator = require("./account-validator")
const bcrypt = require("bcryptjs")
const BCRYPT_SALT_LENGTH = 10

module.exports = function({accountRepository}) {
    return {
        attemptSignIn: function(email, password, callback) {
            const validatorError = accountValidator.getErrorsEmailAndPassword(email, password)

            if (validatorError) {
                callback(validatorError, null)
                return
            }

            accountRepository.getAccountByEmail(email, function(error, account) {
                if (account) {
                    bcrypt.compare(password, account.hashedPassword, (err, loginSuccess) => {
                        if (err) {
                            callback(err, null)
                        }
                        if (loginSuccess) {
                            callback(null, {didSignIn: true, accId: account.id})
                        } else {
                            callback("PASSWORD IS INCORRECT", false)
                        }
                    })
                } else {
                    callback(error, false)
                }
            })
        },
        attemptSignUp: async function(email, verifyEmail, password, verifyPassword, callback) {
            const validatorError = accountValidator.getErrorsEmailAndPassword(email, verifyEmail, password, verifyPassword)

            if (validatorError) {
                callback(validatorError, null)
                return
            }

            const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_LENGTH)
            
            accountRepository.createAccount(email, hashedPassword, callback)
        }
    }
}