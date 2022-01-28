const MIN_EMAIL_LENGTH = 5
const MAX_EMAIL_LENGTH = 70

exports.getErrorsNewAccount = function(account){
	
	const errors = []
	
	// Validate EMAIL.
	if(!account.hasOwnProperty("email")){
		errors.push("EMAILMissing")
	}else if(account.email.length < MIN_EMAIL_LENGTH){
		errors.push("EMAILTooShort")
	}else if(MAX_EMAIL_LENGTH < account.email.length){
		errors.push("EMAILTooLong")
	}
	
	return errors
	
}