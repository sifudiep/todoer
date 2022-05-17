const accountValidator = require("./account-validator")
const bcrypt = require("bcryptjs")
const BCRYPT_SALT_LENGTH = 10

module.exports = function({accountRepository}) {
    return {
        attemptSignIn: function(email, password, callback) {
            const validatorError = accountValidator.getErrorEmailAndPassword(email, null, password, null)

            if (validatorError) {
                callback(validatorError, null)
                return
            }

            accountRepository.getAccountByEmail(email, function(databaseError, account) {
                if (account) {
                    bcrypt.compare(password, account.hashedPassword, (err, loginSuccess) => {
                        if (err) {
                            callback(err, null)
                            return
                        }
                        if (loginSuccess) {
                            callback(null, {didSignIn: true, accountId: account.id})
                        } else {
                            callback("Password was incorrect...", false)
                        }
                    })
                } else {
                    callback(databaseError, false)
                }
            })
        },
        attemptSignUp: async function(email, verifyEmail, password, verifyPassword, callback) {
            const validatorError = accountValidator.getErrorEmailAndPassword(email, verifyEmail, password, verifyPassword)

            if (validatorError) {
                callback(validatorError, null)
                return
            }

            const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_LENGTH)
            
            accountRepository.createAccount(email, hashedPassword, callback)
        }
    }
}