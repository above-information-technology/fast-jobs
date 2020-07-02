const express = require('express')
const random = require('random-string-generator')
const User = require('../models/user')
const { ObjectID } = require('mongodb')
const Job = require('../models/job')
const Applicant = require('../models/applicant')
const Login = require('../models/login')
const verifyToken = require('../common/google-auth')
const router = new express.Router()

router.get('/user/:id', async (req, res) => {
    id = new ObjectID(req.params.id)

    try {

        const user = await User.findById(id)
        return res.send(
                        { 
                            name: user.name,
                            rating: user.rating,
                            phone: user.phoneNumber
                        }
                       )

    } catch(e) {

        if (!user) {
            return res.status(404).send('Userul nu a putut fi gasit!')
        }

        return res.status(400).send(e.message)

    }

})

router.post('/user/rating', async (req, res) => {

    const reqRating = Number(req.body.rating)
    const _id = new ObjectID(req.body.id)

    console.log(req.body)
    try {

        const user = await User.findById(_id)
        const thisRating = Number(user.rating)
        const nrOfRatings = Number(user.numberOfRatings)

        rat = await User.updateOne({ _id }, { rating: Number(((thisRating * nrOfRatings + reqRating) / (nrOfRatings + 1)).toFixed(2)), numberOfRatings: nrOfRatings + 1 })

        const applicants = await Applicant.deleteMany({ jobId: _id })

        return res.status(200).send('Rating-ul a fost trimis cu succes!')

    } catch (e){
        
        return res.status(400).send(e.message)

    }
})

router.patch('/user', async (req, res) => {
    
    try {

        const user = await Login.updateOne({ username: req.body.username, password: req.body.oldPassword }, { password: req.body.newPassword })
        return res.status(200).send('Parola a fost modificata cu succes!')

    } catch {

        return res.status(400).send('Nu a putut fi modificata parola!')

    }

})

router.get("/user/token/:token", async (req, res) => {

    try {

        const payload = await verifyToken(req.params.token)
        const user  = await User.findOne({ email: payload.email })

        if (user) {

            return res.status(200).send(user)

        } else {

            const _id = new ObjectID()

            const newUser = {
                _id,
                email: payload.email,
                name: payload.name
            }

            const newLogin = {
                _id,
                username: payload.email,
                password: random(16)
            }

            user = new User(newUser)
            const login = new Login(newLogin)

            await user.save()
            await login.save()

            res.status(201).send(user)

        }

    } catch {

        return res.status(400).send('Cannot authenticate!')

    }

})

module.exports = router