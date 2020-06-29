const express = require('express')
const User = require('../models/user')
const Login = require('../models/login')
const { ObjectID } = require('mongodb')
const router = new express.Router()

router.post("/register/credentials", async (req, res) => {

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

    try {

        await user.save()
        await login.save()
        return res.status(201).send(user)

    } catch {

        return res.status(400).send("User-ul nu a putut fi creat")
        
    }
})

module.exports = router