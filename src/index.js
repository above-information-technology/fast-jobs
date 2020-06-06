require('./db/mongoose')
const express = require('express')
const User = require('./models/user')
const Job = require('./models/job')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get("/user", async (req, res) => {
    const user = await User.find({})
    console.log(user)
    res.send()
})

app.post("/register", async (req, res) => {

    const user = new User(req.body)
    console.log(req.body)
    console.log(user)
    try {
        await user.save()
        res.status(201).send()
    } catch {
        await res.status(400).send("bad request")
    }
})

app.get("/job", async (req, res) => {
    const job = await Job.find({})
})

app.post("/job", async (req, res) => {
    const job = new Job(req.body)
    try {
        await job.save()
        job.status(201).send()
    } catch {
        await res.status(400).send("bad request")
    }
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})