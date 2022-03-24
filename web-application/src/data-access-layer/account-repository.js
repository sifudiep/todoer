const db = require('./db')

module.exports = function({}) {
    return {
        getAccountByEmail: function(email, callback){
            const query = `SELECT * FROM accounts WHERE email = ? LIMIT 1`
            const values = [email]
            
            db.query(query, values, function(err, accounts){
                if(err){
                    callback(err, null)
                }else{
                    callback(null, accounts[0])
                }
            })
            
        },
        createAccount: function(email, hashedPassword, callback) {
            const query = `INSERT INTO accounts (email, hashedPassword) VALUES (?, ?)`
            const values = [email, hashedPassword]

            db.query(query, values, (err, res) => {
                if (err) {
                    callback(err, null)
                } else {
                    callback(null, res)
                }
            })
        }
    }
}
