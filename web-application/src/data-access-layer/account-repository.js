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
        },
        addTodo: function(title, description, accId, callback) {
            const query = `INSERT INTO todos (title, description, accId) VALUES (?, ?, ?)`
        
            const values = [title, description, accId]
        
            db.query(query, values, function(error, result){
                console.log(`result addTodo: `);
                console.log(result);
        
                if(error){
                    console.log("ERROR!");
                    console.log(error);
                }
        
        
            })
        },
        getAllTodos: function(accId, callback) {
            const query = "SELECT * from todos WHERE accId = ?"
        
            const values = [accId]
        
            db.query(query, values, function(error, result){
                if(error){
                    console.log("ERROR!");
                    console.log(error);
                }
                
                if (result) {
                    callback(null, result)
                }
                
            })
        }
    }
}
