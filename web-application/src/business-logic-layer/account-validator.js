const MAX_EMAIL_LENGTH = 50
const MIN_EMAIL_LENGTH = 8

const MAX_PASSWORD_LENGTH = 50
const MIN_PASSWORD_LENGTH = 5

exports.getErrorsEmailAndPassword = function(email, password){
	const errors = []
    
	if (email.length == 0) {
        errors.push("emailMissing")
    } else if (email.length > MAX_EMAIL_LENGTH) {
        errors.push("emailTooLong")
    } else if (email.length < MIN_EMAIL_LENGTH) {
        errors.push("emailTooShort")
    } else if (password.length > MAX_PASSWORD_LENGTH) {
        errors.push("passwordTooLong")
    } else if (password.length == 0) {
        errors.push("passwordMissing")
    } else if (password.length < MIN_PASSWORD_LENGTH) {
        errors.push("passwordTooShort")
    }

	return errors
}