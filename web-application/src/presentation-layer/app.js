const path = require("path")
const express = require("express")
const expressHandlebars = require("express-handlebars")

const COOKIE_MILLISECONDS_LIFESPAN = 1000 * 60 * 60
const REDIS_PORT = 6379
const SECRET_STORE_KEY = "aSecreetKey"
const REDIS_SERVER_NAME = "redis-server"

const csrf = require("csurf")
const csrfProtection = csrf()

const Redis = require("ioredis");
const awilix = require("awilix")

const accountRepository = require("../data-access-layer/account-repository")
const accountManager = require("../business-logic-layer/account-manager")
const todoRepository = require("../data-access-layer/todo-repository")
const todoManager = require("../business-logic-layer/todo-manager")
const accountRouter = require("./routers/account-router")
const variousRouter = require("./routers/various-router")
const todoRouter = require("./routers/todo-router")

const container = awilix.createContainer()

container.register("accountRepository", awilix.asFunction(accountRepository))
container.register("accountManager", awilix.asFunction(accountManager))
container.register("todoRepository", awilix.asFunction(todoRepository))
container.register("todoManager", awilix.asFunction(todoManager))
container.register("accountRouter", awilix.asFunction(accountRouter))
container.register("variousRouter", awilix.asFunction(variousRouter))
container.register("todoRouter", awilix.asFunction(todoRouter))

const theAccountRouter = container.resolve("accountRouter")
const theVariousRouter = container.resolve("variousRouter")
const theTodoRouter = container.resolve("todoRouter")

const app = express()

const session = require("express-session")
let RedisStore = require("connect-redis")(session)

const ioredis = new Redis(REDIS_PORT, REDIS_SERVER_NAME); // uses defaults unless given configuration object

// Adds body to req
app.use(express.urlencoded({
    extended: false
}))

app.use(
    session({
        store: new RedisStore({ client: ioredis }),
        saveUninitialized: false,
        secret: SECRET_STORE_KEY,
        resave: false,
        cookie: {
            secure: false, // TODO : Change to TRUE during production
            httpOnly: true,
            maxAge: COOKIE_MILLISECONDS_LIFESPAN
        }
    })
)

app.use(csrfProtection);

app.engine("hbs", expressHandlebars.engine({
    defaultLayout: "main.hbs"
}))

// Setup express-handlebars.
app.set("views", path.join(__dirname, "views"))

// Handle static files in the public folder.
app.use(express.static(path.join(__dirname, "public")))

// Attach all routers.
app.use("/", theVariousRouter)
app.use("/accounts", theAccountRouter)
app.use("/todo", theTodoRouter)


module.exports = app


