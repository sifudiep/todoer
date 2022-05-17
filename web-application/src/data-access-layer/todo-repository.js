const db = require('./db')
const global = require(".././global")

module.exports = function({}) {
    return {
        addTodo: function(title, description, accountId, callback) {
            const query = `INSERT INTO todos (title, description, accountId) VALUES (?, ?, ?)`
        
            const values = [title, description, accountId]
        
            db.query(query, values, function(err){
                if(err){
                    if (err == global.ERROR_DUPLICATE) {
                        callback("Todo task with same title already exists, please remove the Todo task with identical title or use a different title.", {
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
                    callback(null)
                }
            })
        },
        getAllTodos: function(accountId, callback) {
            const query = "SELECT * FROM todos WHERE accountId = ?"
        
            const values = [accountId]
        
            db.query(query, values, function(err, todos){
                if(err){
                    if (err.code == global.ERROR_TIMEOUT) {
                        callback("Communication with database was unsuccessful, please try again later", null)
                    } else {
                        callback("Todos could not be retrieved...", null)
                    }
                } else {
                    callback(null, todos)
                }
            })
        },
        deleteTodo: function(id, accountId, callback) {
            const query = "DELETE FROM todos WHERE id = ? AND accountId = ?"

            const values = [id, accountId]
            
            db.query(query, values, function(err) {
                if (err) {
                    if (err.code == global.ERROR_TIMEOUT) {
                        callback("Communication with database was unsuccessful, please try again later")  
                    }
                } else {
                    callback(null)
                }
            })
        }
    }
}