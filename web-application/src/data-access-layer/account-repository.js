const db = require('./db')
const global = require("../global")

module.exports = function({}) {
    return {
        getAccountByEmail: function(email, callback) {
            const query = `SELECT * FROM accounts WHERE email = ? LIMIT 1`
            const values = [email]
            
            db.query(query, values, function(err, accounts) {
                if(err){                    
                    if (err.code == global.ERROR_TIMEOUT) {
                        callback({code : 503, message : "Communication with database was unsuccessful, please try again later"}, null)  
                    }
                } else{
                    if (accounts != null && accounts.length > 0) {
                        callback(null, accounts[0])
                    } else {
                        callback({code : 404, message : "Email is not registered on Todoer..."}, null)
                    }
                }
            })
        },
        createAccount: function(email, hashedPassword, callback) {
            const query = `INSERT INTO accounts (email, hashedPassword) VALUES (?, ?)`
            const values = [email, hashedPassword]

            db.query(query, values, function(err) {
                if (err) {
                    if (err.code == global.ERROR_DUPLICATE) {
                        callback({code : 400, message : "Email is already registered on Todoer, please sign up using a different email."}, false)
                    } else if (err.code == global.ERROR_TIMEOUT) {
                        callback({code : 503, message : "Communication with database was unsuccessful, please try again later"}, false)  
                    } 
                } else {
                    callback(null, true)
                }
            })
        }
    }
}
