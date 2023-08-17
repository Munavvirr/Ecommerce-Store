const express = require("express")
const cors = require("cors")
const bodyparser = require("body-parser")

const app = express()
app.use(express.static("public"))
app.use(bodyparser.urlencoded({ extended: false}))
app.use(bodyparser.json())
app.use(cors({origin: true, credentials: true}))

const stripe = require("stripe")("sk_test_51NBGZIHQ2HgMWU8nMB4mAi6MJ1jfyRkXaGNVBQvHu0zIwtDIb9A99fmmAMnEjpfRGRxfPMqlG1ozQAPVK0qmjUmm00JzArh4O6")

app.post("/checkout", async (req, res, next) => {
    try
})