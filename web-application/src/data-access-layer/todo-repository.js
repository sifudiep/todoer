const db = require('./db')

module.exports = function({}) {
    return {
        addTodo: function(title, description, accId, callback) {
            const query = `INSERT INTO todos (title, description, accId) VALUES (?, ?, ?)`
        
            const values = [title, description, accId]
        
            db.query(query, values, function(error, result){
                if(error){
                    callback(error, null)
                }

                callback(null, result)
            })
        },
        getAllTodos: function(accId, callback) {
            const query = "SELECT * from todos WHERE accId = ?"
        
            const values = [accId]
        
            db.query(query, values, function(error, result){
                if(error){
                    console.log("ERROR!");
                    console.log(error);
                }
                
                if (result) {
                    callback(null, result)
                }
                
            })
        }
    }
}