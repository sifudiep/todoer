const todoValidator = require("./todo-validator")

module.exports = function({todoRepository}) {
    return {
        addTodo: function(title, description, accId, callback) {
            let error = todoValidator.getErrorTodo(title, description)
            
            if (error) {
                callback(errors, null)
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