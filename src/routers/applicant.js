const express = require('express')
const Applicant = require('../models/applicant')
const User = require('../models/user')
const { ObjectID } = require('mongodb')
const router = new express.Router()

router.post('/applicant', async (req, res) => {
    const applicant = new Applicant(req.body)

    try {

        await applicant.save()
        return res.status(201).send('Aplicarea a fost efectuata cu succes!')

    } catch {
        return res.status(400).send('Aplicarea nu a resit!')
    }
})

router.get('/applicant/:id', async (req, res) => {
    
    const id = req.params.id

    try {

        const applicant = await Applicant.find({ jobId: id })

        allUsers = applicant.map(applic => {
            const _id = new ObjectID(applicant.id)
            const user = await User.findById(_id)

            return user
        })

        return res.status(200).send(allUsers)

    } catch {

        return res.status(400).send('Nu a fost gasit niciun aplicant!')

    }

})

module.exports = router
