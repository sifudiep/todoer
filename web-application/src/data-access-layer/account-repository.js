const db = require('./db')
const bcrypt = require('bcryptjs')

const BCRYPT_SALT_LENGTH = 10

module.exports = function({}) {
    return {
        getAllAccounts: function(callback){
	
            const query = `SELECT * FROM accounts ORDER BY email`
            const values = []
            
            db.query(query, values, function(err, accounts){
                if(err){
                    callback(['databaseError'], null)
                }else{
                    callback([], accounts)
                }
            })
            
        },
        getAccountByEmail: function(email, callback){
	
            const query = `SELECT * FROM accounts WHERE email = ? LIMIT 1`
            const values = [email]
            
            db.query(query, values, function(err, accounts){
                if(err){
                    callback(['databaseError'], null)
                }else{
                    callback(null, accounts[0])
                }
            })
            
        },
        attemptSignIn: function(email, password, callback) {
            this.getAccountByEmail(email, function(error, account) {
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
                    callback("EMAIL DOES NOT EXIST", false)
                }
            })
        },
        attemptSignUp: async function(email, password, callback) {
            const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_LENGTH)

            const query = `INSERT INTO accounts (email, hashedPassword) VALUES (?, ?)`
            const values = [email, hashedPassword]

            db.query(query, values, (err, res) => {
                callback(err, res)
            })
        }
    }
}
