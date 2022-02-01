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
        }
    }
}