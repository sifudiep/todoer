const express = require('express')
const accountManager = require('../../business-logic-layer/account-manager')

const router = express.Router()

router.get("/sign-up", (req, res) => {
	res.render("accounts-sign-up.hbs")
})

router.get("/sign-in", (req, res) => {
	res.render("accounts-sign-in.hbs")
})

router.post("/sign-in", (req, res) => {
	console.log(req.body);
})

router.get("/", (req, res) => {
	accountManager.getAllAccounts((err, accounts) => {
		const model = {
			errors: errors,
			accounts: accounts
		}
		res.render("accounts-list-all.hbs", model)
	})
})

router.get('/:username', (req, res) => {
	
	const username = req.params.username
	
	accountManager.getAccountByUsername(username, (err, account) => {
		const model = {
			errors: errors,
			account: account
		}
		res.render("accounts-show-one.hbs", model)
	})
	
})

module.exports = router