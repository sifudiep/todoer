const MAX_TITLE_LENGTH = 50
const MIN_TITLE_LENGTH = 2

const MAX_DESCRIPTION_LENGTH = 100

exports.getErrorsTodo = function(title, description){
	const errors = []
	
    if (title.length == 0) {
        errors.push("titleIsMissing")
    } else if (title.length > MAX_TITLE_LENGTH) {
        errors.push("titleTooLong")
    } else if (title.length < MIN_TITLE_LENGTH) {
        errors.push("titleTooShort")
    } else if (description.length > MAX_DESCRIPTION_LENGTH) {
        errors.push("descriptionTooLong")
    }

	return errors
}