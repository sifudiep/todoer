const MAX_TITLE_LENGTH = 50
const MIN_TITLE_LENGTH = 2

const MAX_DESCRIPTION_LENGTH = 100

exports.getErrorTodo = function(title, description){	
    if (title.length == 0) {
        return "Title is missing..."
    } else if (title.length > MAX_TITLE_LENGTH) {
        return "Title is too long..."
    } else if (title.length < MIN_TITLE_LENGTH) {
        return "Title is too short..."
    } else if (description.length > MAX_DESCRIPTION_LENGTH) {
        return "Description is too long..."
    }
}

