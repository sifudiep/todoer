const express = require("express")
const awilixRoutes = require("../awilixRoutes")

const app = express()


app.use("/", awilixRoutes.theRestRouter)
app.use("/auth", awilixRoutes.theAuthRouter)

module.exports = app