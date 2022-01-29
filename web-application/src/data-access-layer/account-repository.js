const db = require('./db')
const bcrypt = require('bcryptjs')

/*
	Retrieves all accounts ordered by email.
	Possible errors: databaseError
	Success value: The fetched accounts in an array.
*/
exports.getAllAccounts = function(callback){
	
	const query = `SELECT * FROM accounts ORDER BY email`
	const values = []
	
	db.query(query, values, function(error, accounts){
		if(error){
			callback(['databaseError'], null)
		}else{
			callback([], accounts)
		}
	})
	
}

/*
	Retrieves the account with the given email.
	Possible errors: databaseError
	Success value: The fetched account, or null if no account has that email.
*/
exports.getAccountByEmail = function(email, callback){
	
	const query = `SELECT * FROM accounts WHERE email = ? LIMIT 1`
	const values = [email]
	
	db.query(query, values, function(error, accounts){
		if(error){
			callback(['databaseError'], null)
		}else{
			callback(null, accounts[0])
		}
	})
	
}

/*
	Find user with matching email and password.
	Possible errors: Incorrect email or password.
	Success value: True if both email and password matches.
*/
exports.attemptSignIn = function(email, password, callback) {
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
					callback(null, true)
				} else {
					callback(null, false)
				}
			})
		}		
	})
}