const express = require("express")
const app = express()

const web = require("./presentation-layer/app")
const rest = require("./presentation-layer-rest/rest-api")
const auth = require("./presentation-layer-rest/auth-server")

app
    .use("/", web)
    .use("/rest", rest)
    .use("/auth", auth)
    .listen(8080, () => {
        console.log(`listening on port 8080 for web, rest and auth!`);
    })