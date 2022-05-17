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
const awilixRoutes = require("../awilixRoutes")

const app = express()

const session = require("express-session")
let RedisStore = require("connect-redis")(session)

const ioredis = new Redis(REDIS_PORT, REDIS_SERVER_NAME); // uses defaults unless given configuration object

app.use(express.json())

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
app.use("/", awilixRoutes.theVariousRouter)
app.use("/accounts", awilixRoutes.theAccountRouter)
app.use("/todo", awilixRoutes.theTodoRouter)


module.exports = app


