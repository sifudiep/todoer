const express = require("express")
const awilix = require("awilix")

const authRouters = require("./auth-routers/auth-router")

const accountRepository = require("../data-access-layer/account-repository")
const accountManager = require("../business-logic-layer/account-manager")

const container = awilix.createContainer()

container.register("accountRepository", awilix.asFunction(accountRepository))
container.register("accountManager", awilix.asFunction(accountManager))

container.register("authRouters", awilix.asFunction(authRouters))

const theAuthRouters = container.resolve("authRouters")

const app = express()

app.use("/", theAuthRouters)

module.exports = app