const db = require('./db')

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
			callback([], accounts[0])
		}
	})
	
}