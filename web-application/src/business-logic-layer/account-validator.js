const MAX_EMAIL_LENGTH = 50
const MIN_EMAIL_LENGTH = 8

const MAX_PASSWORD_LENGTH = 50
const MIN_PASSWORD_LENGTH = 5

const emailRegex = new RegExp('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,14}$')

exports.getErrorEmailAndPassword = function(email, verifyEmail, password, verifyPassword){
	if (email.length == 0) {
        return "Email is empty..."
    } else if (email.length > MAX_EMAIL_LENGTH) {
        return "Email is too long..."
    } else if (email.length < MIN_EMAIL_LENGTH) {
        return "Email is too short..."
    } else if (!emailRegex.test(email)) {
        return "Email is not written in a correct email format, e.g 'todoer@gmail.com'"
    }else if (password.length > MAX_PASSWORD_LENGTH) {
        return "Password is too long..."
    } else if (password.length == 0) {
        return "Password is empty..."
    } else if (password.length < MIN_PASSWORD_LENGTH) {
        return "Password is too short..."
    } else if (verifyEmail && email.toLowerCase() != verifyEmail.toLowerCase()) {
        return "Email and Verify Email does not match..."
    } else if (verifyPassword && password.toLowerCase() != verifyPassword.toLowerCase()) {
        return "Password and Verify Password does not match..."
    }
}