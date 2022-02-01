module.exports = function({accountRepository}) {
    return {
        getAllAccounts: function(callback){
            accountRepository.getAllAccounts(callback)
        },
        getAccountByEmail: function(email, callback){
            accountRepository.getAccountByEmail(email, callback)
        },
        attemptSignIn: function(email, password, callback) {
            accountRepository.attemptSignIn(email, password, callback)
        },
        addTodo: function(title, description, accId, callback) {
            accountRepository.addTodo(title, description, accId, callback)
        },
        getAllTodos: function(accId, callback) {
            accountRepository.getAllTodos(accId, callback)
        },
    }
}