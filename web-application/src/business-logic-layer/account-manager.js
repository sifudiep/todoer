const accountRepository = require('../data-access-layer/account-repository')
const accountValidator = require('./account-validator')

exports.getAllAccounts = function(callback){
	accountRepository.getAllAccounts(callback)
}

exports.getAccountByEmail = function(email, callback){
	accountRepository.getAccountByEmail(email, callback)
}

exports.attemptSignIn = function(email, password, callback) {
	accountRepository.attemptSignIn(email, password, callback)
}