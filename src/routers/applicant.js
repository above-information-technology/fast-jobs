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
    let applicants = []

    try {

        const applicant = await Applicant.find({ jobId: id })

        console.log(applicant)

        await applicant.forEach(async (applic) => {
            const _id = new ObjectID(applic.userId)

            const user = await User.findById(_id)

            console.log(user)

            applicants.push(user)

        })

        // allUsers = applicant.map(async (applic) => {
        //     const _id = new ObjectID(applic.userId)

        //     console.log(_id)
    
        //     const user = await User.findById(_id)

        //     console.log('user', user)

        //     return user
        // })
        setTimeout(() => {
            return res.status(200).send(applicants)
        }, 1000)


    } catch {

        return res.status(400).send('Nu a fost gasit niciun aplicant!')

    }

})

module.exports = router
