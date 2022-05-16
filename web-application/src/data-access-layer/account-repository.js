const db = require('./db')

const ERROR_DUPLICATE_EMAIL = "ER_DUP_ENTRY";
const ERROR_TIMEOUT = "ETIMEDOUT"

module.exports = function({}) {
    return {
        getAccountByEmail: function(email, callback) {
            const query = `SELECT * FROM accounts WHERE email = ? LIMIT 1`
            const values = [email]
            
            db.query(query, values, function(err, accounts) {
                if(err){                    
                    if (err.code == ERROR_TIMEOUT) {
                        callback("Communication with database was unsuccessful, please try again later", null)  
                    }
                } else{
                    if (accounts.length > 0) {
                        callback(null, accounts[0])
                    } else {
                        callback("Email is not registered on Todoer...", null)
                    }
                }
            })
        },
        createAccount: function(email, hashedPassword, callback) {
            const query = `INSERT INTO accounts (email, hashedPassword) VALUES (?, ?)`
            const values = [email, hashedPassword]

            db.query(query, values, function(err) {
                if (err) {
                    if (err == ERROR_DUPLICATE_EMAIL) {
                        callback("Email is already registered, please use a different email.", false)
                    } else if (err.code == ERROR_TIMEOUT) {
                        callback("Communication with database was unsuccessful, please try again later", false)  
                    } 
                } else {
                    callback(null, true)
                }
            })
        }
    }
}
