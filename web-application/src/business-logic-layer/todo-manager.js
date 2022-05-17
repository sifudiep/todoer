const todoValidator = require("./todo-validator")
const todoAuthorizer = require("./todo-authorizer")

module.exports = function({todoRepository}) {
    return {
        addTodo: function(title, description, session, callback) {
            const validatorError = todoValidator.getErrorTodo(title, description)
            
            if (validatorError) {
                callback(validatorError, null)
                return
            }
            
            const userIsAuthorized = todoAuthorizer.userIsAuthorized(session)

            if (userIsAuthorized) {
                todoRepository.addTodo(title, description, session.accountId, callback)
            } else {
                callback("ERROR 401 - User is not authorized to make this request...", {
                    previousTitle : title,
                    previousDescription : description
                })
            }
        },
        getAllTodos: function(session, callback) {
            const userIsAuthorized = todoAuthorizer.userIsAuthorized(session)

            if (userIsAuthorized) {
                todoRepository.getAllTodos(session.accountId, callback)
            } else {
                callback("ERROR 401 - Please login to view Todo tasks.", null)
            }
        },
        deleteTodo: function(session, id, title, callback) {
            const userIsAuthorized = todoAuthorizer.userIsAuthorized(session)

            if (userIsAuthorized) {
                todoRepository.deleteTodo(id, session.accountId, title, callback)
            } else {
                callback("ERROR 401 - User is not authorized to make this request...")                
            }
        }
    }
}