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

router.post('/user/rating/', async (req, res) => {

    const rating = req.params.rating
    const id = new ObjectID(req.params.id)

    try {

        const user = await User.findById(id)
        user = await User.updateOne({ rating: (this.rating * this.numberOfRatings + rating) / (numberOfRatings + 1) })
        user = await User.updateOne({ numberOfRatings: this.numberOfRatings + 1 })
        return res.status(200).send('Rating-ul a fost trimis cu succes!')

    } catch {
        
        return res.status(400).send('Nu a putut fi trimis rating-ul!')

    }
})

module.exports = router