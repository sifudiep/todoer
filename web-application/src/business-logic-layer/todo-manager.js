module.exports = function({todoRepository}) {
    return {
        addTodo: function(title, description, accId, callback) {
            todoRepository.addTodo(title, description, accId, callback)
        },
        getAllTodos: function(accId, callback) {
            todoRepository.getAllTodos(accId, callback)
        }
    }
}