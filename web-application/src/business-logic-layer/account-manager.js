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

exports.addTodo = function(title, description, accId, callback) {
    accountRepository.addTodo(title, description, accId, callback)
}

exports.getAllTodos = function(accId, callback) {
    accountRepository.getAllTodos(accId, callback)
}