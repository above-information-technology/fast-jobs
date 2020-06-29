const express = require('express')
const Login = require('../models/login')
const User = require('../models/user')
const { ObjectID } = require('mongodb')
const router = new express.Router()

router.post("/login/credentials", async (req, res) => {

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

module.exports = router