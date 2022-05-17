const awilix = require("awilix");

const accountRepository = require("./data-access-layer/account-repository")
const accountManager = require("./business-logic-layer/account-manager")
const todoRepository = require("./data-access-layer/todo-repository")
const todoManager = require("./business-logic-layer/todo-manager")
const accountRouter = require("./presentation-layer/routers/account-router")
const variousRouter = require("./presentation-layer/routers/various-router")
const todoRouter = require("./presentation-layer/routers/todo-router")
const restRouter = require("./presentation-layer-rest/rest-routers/rest-router")
const authRouter = require("./presentation-layer-rest/auth-routers/auth-router")

const container = awilix.createContainer()

container.register("accountRepository", awilix.asFunction(accountRepository))
container.register("accountManager", awilix.asFunction(accountManager))
container.register("todoRepository", awilix.asFunction(todoRepository))
container.register("todoManager", awilix.asFunction(todoManager))
container.register("accountRouter", awilix.asFunction(accountRouter))
container.register("variousRouter", awilix.asFunction(variousRouter))
container.register("todoRouter", awilix.asFunction(todoRouter))
container.register("authRouters", awilix.asFunction(authRouter))
container.register("restRouter", awilix.asFunction(restRouter))

const theAccountRouter = container.resolve("accountRouter")
const theVariousRouter = container.resolve("variousRouter")
const theTodoRouter = container.resolve("todoRouter")
const theRestRouter = container.resolve("restRouter")
const theAuthRouter = container.resolve("authRouters")

module.exports = {
    theAccountRouter,
    theVariousRouter,
    theTodoRouter,
    theRestRouter,
    theAuthRouter
}