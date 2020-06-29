const express = require('express')
const User = require('../models/user')
const Login = require('../models/login')
const { ObjectID } = require('mongodb')
const Job = require('../models/job')
const router = new express.Router()

router.post('/job', async (req, res) => {
    const job = new Job(req.body)

    try {

        await job.save()
        return res.status(201).send(job)

    } catch {

        return res.status(400).send('Jobul nu a putut fi creat!')

    }
})

router.get('/job/:type', async (req, res) => {
    type = req.params.type.replace('_', "")
    
    try {

        const jobs = await Job.find({ type })
        return res.status(200).send(jobs)

    } catch (e) {

        if (jobs.length == 0) {
            return res.status(404).send('Nu a fost gasit niciun job!')
        }

        return res.status(404).send(e.message)

    }

})

router.get('/job', async (req, res) => {
    try {

        const jobs = await Job.find({})
        return res.status(200).send(jobs)

    } catch (e) {

        if (jobs.length == 0) {
            return res.status(404).send('Nu a fost gasit niciun job!')
        }

        return res.status(400).send(e.message)

    }
})

module.exports = router