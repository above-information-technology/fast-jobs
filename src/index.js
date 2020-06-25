require('./db/mongoose')
const express = require('express')
const User = require('./models/user')
const Job = require('./models/job')
const { ObjectID } = require('mongodb')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Router page")
})

app.get("/user", async (req, res) => {
    const user = await User.find({})
    console.log(user)
    res.send()
})

app.post("/register/credentials", async (req, res) => {

    const id = new ObjectID()

    const userFields = {
        _id: id,
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        phoneNumber: req.body.phoneNumber
    }

    const loginFields = {
        username: req.body.username,
        password: req.body.password,
        _id: id
    }

    const user = new User(userFields)
    console.log(req.body)
    console.log(user)
    try {
        await user.save()
        await loginFields.save()
        res.status(201).send(user)
    } catch {
        await res.status(400).send("User-ul nu a putut fi creat")
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