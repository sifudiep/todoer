const todoValidator = require("./todo-validator")

module.exports = function({todoRepository}) {
    return {
        addTodo: function(title, description, accId, callback) {
            let errors = todoValidator.getErrorsTodo(title, description)
            
            if (errors.length > 0) {
                callback(errors[0], null)
                return
            }

            todoRepository.addTodo(title, description, accId, callback)
        },
        getAllTodos: function(accId, callback) {
            todoRepository.getAllTodos(accId, callback)
        },
        deleteTodo: function(accId, title, callback) {
            todoRepository.deleteTodo(accId, title, callback)
        }
    }
}