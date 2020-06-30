const express = require('express')
const User = require('../models/user')
const { ObjectID } = require('mongodb')
const router = new express.Router()

router.get('/user/:id', async (req, res) => {
    id = new ObjectID(req.params.id)

    try {

        const user = await User.findById(id)
        return res.send(
                        { 
                            name: user.name,
                            rating: user.rating 
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
        return res.status(200).send('Rating-ul a fost trimis cu succes!')

    } catch (e){
        
        return res.status(400).send(e.message)

    }
})

module.exports = router