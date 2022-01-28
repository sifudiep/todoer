const express = require('express')
const accountManager = require('../../business-logic-layer/account-manager')
const bcrypt = require('bcryptjs')

const router = express.Router()

router.get("/sign-in", (req, res) => {
	res.render("accounts-sign-in.hbs")
})

router.post("/sign-in", async (req, res) => {
	accountManager.getAccountByEmail(req.body.email, (err, account) => {
		if (account) {
			bcrypt.compare(req.body.password, account.hashedPassword, (err, res) => {
				if (res) {
					console.log(`success!`);
					// logged into account!
				} else {
					console.log(`failure! `);
				}
			})

		}
	})
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
	
	accountManager.getAccountByEmail(username, (err, account) => {
		const model = {
			errors: errors,
			account: account
		}
		res.render("accounts-show-one.hbs", model)
	})
	
})

module.exports = router