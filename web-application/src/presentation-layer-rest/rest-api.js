const express = require("express")
const awilix = require("awilix")

const todoRepository = require("../data-access-layer/todo-repository")
const todoManager = require("../business-logic-layer/todo-manager")

const restRouter = require("./rest-routers/rest-router")

const container = awilix.createContainer()


container.register("todoRepository", awilix.asFunction(todoRepository))
container.register("todoManager", awilix.asFunction(todoManager))

container.register("restRouter", awilix.asFunction(restRouter))

const app = express()

const theRestRouter = container.resolve("restRouter")

app.use("/", theRestRouter)

module.exports = app