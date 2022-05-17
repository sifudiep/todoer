const express = require("express")
const awilixRoutes = require("../awilixRoutes")
const cors = require("cors")

const app = express()

app.use(cors({
    origin: "http://localhost"
}))

app.use(express.json())

app.use("/", awilixRoutes.theRestRouter)
app.use("/auth", awilixRoutes.theAuthRouter)

module.exports = app