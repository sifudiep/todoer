const db = require('./db')
const bcrypt = require('bcryptjs')

module.exports = function({}) {
    return {
        getAllAccounts: function(callback){
	
            const query = `SELECT * FROM accounts ORDER BY email`
            const values = []
            
            db.query(query, values, function(error, accounts){
                if(error){
                    callback(['databaseError'], null)
                }else{
                    callback([], accounts)
                }
            })
            
        },
        getAccountByEmail: function(email, callback){
	
            const query = `SELECT * FROM accounts WHERE email = ? LIMIT 1`
            const values = [email]
            
            db.query(query, values, function(error, accounts){
                if(error){
                    callback(['databaseError'], null)
                }else{
                    callback(null, accounts[0])
                }
            })
            
        },
        attemptSignIn: function(email, password, callback) {
            this.getAccountByEmail(email, (err, account) => {
                if (err) {
                    console.log(err);
                }
                if (account) {
                    bcrypt.compare(password, account.hashedPassword, (err, loginSuccess) => {
                        if (err) {
                            console.error(err)
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
        }
    }
}
