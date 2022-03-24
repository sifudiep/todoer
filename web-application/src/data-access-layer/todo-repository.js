const db = require('./db')

module.exports = function({}) {
    return {
        addTodo: function(title, description, accId, callback) {
            const query = `INSERT INTO todos (title, description, accId) VALUES (?, ?, ?)`
        
            const values = [title, description, accId]
        
            db.query(query, values, function(err, res){
                if(err){
                    callback(err, null)
                }

                callback(null, res)
            })
        },
        getAllTodos: function(accId, callback) {
            const query = "SELECT * FROM todos WHERE accId = ?"
        
            const values = [accId]
        
            db.query(query, values, function(err, res){
                if(err){
                    callback(err, null)
                } else {
                    callback(null, res)
                }
            })
        },
        deleteTodo: function(accId, title, callback) {
            const query = "DELETE FROM todos WHERE accId = ? AND title = ?"

            const values = [accId, title]

            db.query(query, values, function(err, res) {
                callback(err, res)
            })
        }
    }
}