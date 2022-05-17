const express = require("express")
const app = express()


const PORT = 8080

const web = require("./presentation-layer/app")
const rest = require("./presentation-layer-rest/rest-api")

app
    .use("/rest", rest)
    .use("/", web)
    .listen(PORT, () => {
        console.log(`listening on port 8080 for web, rest and auth!`);
    })