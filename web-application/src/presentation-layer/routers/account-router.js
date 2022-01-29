const express = require('express')
const accountManager = require('../../business-logic-layer/account-manager')

const router = express.Router()

router.get("/sign-in", (req, res) => {
	res.render("accounts-sign-in.hbs")
})

router.post("/sign-in", (req, res) => {
	accountManager.attemptSignIn(req.body.email, req.body.password, (err, didSignIn) => {
		if (err) {
            console.log(`ERR:`);
            console.log(err)
        }
		console.log(`didSignIn: ${didSignIn}`);

		if (didSignIn) {
			req.session.isAuth = true
			console.log(req.sessionID);
            res.render("home.hbs")
            return

		}

        res.render("accounts-sign-in.hbs")
	})
})

router.get("/", (req, res) => {
	accountManager.getAllAccounts((err, accounts) => {
		const model = {
			err: err,
			accounts: accounts
		}

		res.render("accounts-list-all.hbs", model)
	})
})

router.get('/:username', (req, res) => {
	
	const username = req.params.username
	
	accountManager.getAccountByEmail(username, (err, account) => {
		const model = {
			err: err,
			account: account
		}
		res.render("accounts-show-one.hbs", model)
	})
	
})

module.exports = router