const express = require("express")
const awilix = require("awilix")

const todoRepository = require("../data-access-layer/todo-repository")
const todoManager = require("../business-logic-layer/todo-manager")
const accountRepository = require("../data-access-layer/account-repository")
const accountManager = require("../business-logic-layer/account-manager")

const restRouter = require("./rest-routers/rest-router")
const authRouters = require("./auth-routers/auth-router")

const container = awilix.createContainer()

container.register("todoRepository", awilix.asFunction(todoRepository))
container.register("todoManager", awilix.asFunction(todoManager))
container.register("accountRepository", awilix.asFunction(accountRepository))
container.register("accountManager", awilix.asFunction(accountManager))

container.register("authRouters", awilix.asFunction(authRouters))
container.register("restRouter", awilix.asFunction(restRouter))

const app = express()

const theRestRouter = container.resolve("restRouter")
const theAuthRouters = container.resolve("authRouters")

app.use("/", theRestRouter)
app.use("/auth", theAuthRouters)

module.exports = app