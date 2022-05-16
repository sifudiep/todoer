const db = require('./db')
const global = require(".././global")

module.exports = function({}) {
    return {
        addTodo: function(title, description, accId, callback) {
            const query = `INSERT INTO todos (title, description, accId) VALUES (?, ?, ?)`
        
            const values = [title, description, accId]
        
            db.query(query, values, function(err, res){
                if(err){
                    if (err = global.ERROR_DUPLICATE) {
                        callback("Todo task with same title already exists, please remove earlier Todo or use a different title.", {
                            previousTitle : title, 
                            previousDescription : description
                        })
                    }

                    if (err.code == global.ERROR_TIMEOUT) {
                        callback("Communication with database was unsuccessful, please try again later", {
                            previousTitle : title, 
                            previousDescription : description
                        })  
                    }
                } else {
                    callback(null, res)
                }
            })
        },
        getAllTodos: function(accId, callback) {
            const query = "SELECT * FROM todos WHERE accId = ?"
        
            const values = [accId]
        
            db.query(query, values, function(err, res){
                if(err){
                    callback("ERROR - Could not retrieve all Todos!", null)
                } else {
                    callback(null, res)
                }
            })
        },
        deleteTodo: function(accId, title, callback) {
            const query = "DELETE FROM todos WHERE accId = ? AND title = ?"

            const values = [accId, title]

            db.query(query, values, function(err, res) {
                if (err) {
                    callback("ERROR - Could not delete Todo!", null)
                } else {
                    callback(null, res)
                }
            })
        }
    }
}