require('./db/mongoose')
const express = require('express')
const User = require('./models/user')
const { ObjectID } = require('mongodb')
const Login = require('./models/login')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Router page")
})

app.post("/login/credentials", async (req, res) => {

    let id, _id;
    
    try {

        id = await Login.findByCredentials(req.body.username, req.body.password)

    } catch (e) {
        if (e.message == "User not found!") {
            return res.status(404).send(e.message)
        }

        return res.status(400).send("Unable to recieve user")

    }

    try {

        _id = new ObjectID(id)
        const user = await User.findById(_id)
        return res.status(200).send(user)
        
    } catch {

        return res.status(400).send("User not found!")

    }

})

app.post("/register/credentials", async (req, res) => {

    const id = new ObjectID()
    console.log(id, "acesta este id - ul")

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
    const login = new Login(loginFields)
    console.log(req.body)
    //console.log(user)
    try {
        await user.save()
        await login.save()
        res.status(201).send(user)
    } catch {
        res.status(400).send("User-ul nu a putut fi creat")
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