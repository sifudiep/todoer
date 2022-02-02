const express = require("express")
const app = express()

const web = require("./presentation-layer/app")
const rest = require("./presentation-layer-rest/rest-app")

app
    .use("/", web)
    .use("/rest", rest)
    .listen(8080, () => {
        console.log(`listening on port 8080 for both rest and web!`);
    })