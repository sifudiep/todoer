const path = require('path')
const express = require('express')
const expressHandlebars = require('express-handlebars')

const COOKIE_MILLISECONDS_LIFESPAN = 1000 * 60 * 60

const variousRouter = require('./routers/various-router')
const accountRouter = require('./routers/account-router')

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
            secure: false, // TODO : Change to TRUE during production
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
app.use('/', variousRouter)
app.use('/accounts', accountRouter)

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





