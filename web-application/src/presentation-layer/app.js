const path = require('path')
const express = require('express')
const expressHandlebars = require('express-handlebars')

const COOKIE_MILLISECONDS_LIFESPAN = 1000 * 60 * 60


const awilix = require('awilix')

const accountRepository = require("../data-access-layer/account-repository")
const accountManager = require("../business-logic-layer/account-manager")
const accountRouter = require('./routers/account-router')
const variousRouter = require('./routers/various-router')

const container = awilix.createContainer()

container.register("accountRepository", awilix.asFunction(accountRepository))
container.register("accountManager", awilix.asFunction(accountManager))
container.register("accountRouter", awilix.asFunction(accountRouter))
container.register("variousRouter", awilix.asFunction(variousRouter))

const theAccountRouter = container.resolve("accountRouter")
const theVariousRouter = container.resolve("variousRouter")

const app = express()

const session = require('express-session')
let RedisStore = require('connect-redis')(session)

const Redis = require("ioredis");
const ioredis = new Redis(6379, "redis-server"); // uses defaults unless given configuration object

app.use(
    session({
        store: new RedisStore({ client: ioredis}),
        saveUninitialized: false,
        secret: 'aSecreetKey',
        resave: false,
        cookie: {
            secure: true, // TODO : Change to TRUE during production
            httpOnly: true,
            maxAge: COOKIE_MILLISECONDS_LIFESPAN
        }
    })
)

// Adds body to req
app.use(express.urlencoded({
    extended: false
}))

app.engine('hbs', expressHandlebars.engine({
    defaultLayout: 'main.hbs'
}))

// Setup express-handlebars.
app.set('views', path.join(__dirname, 'views'))

// Handle static files in the public folder.
app.use(express.static(path.join(__dirname, 'public')))

// Attach all routers.
app.use('/', theVariousRouter)
app.use('/accounts', theAccountRouter)

// Middleware that blocks all unauthorized requests AFTER this code.
// app.use((req, res, next) => {
//     if (!req.session || !req.session.authorized) {
//         const err = new Error("You are not authorized!")
//         err.statuscode = 401
//         next(err)
//     }

//     next()
// })


// Start listening for incoming HTTP requests!
app.listen(8080, function () {
    console.log('Running on 8080!')
})





