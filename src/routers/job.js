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
        res.status(201).send(job)
    } catch {
        res.status(400).send('Jobul nu a putut fi creat!')
    }
})

router.get('/job/:type', async (req, res) => {
    type = req.params.type
    
    try {
        const jobs = await Job.find({ type })
        res.status(200).send(jobs)
    } catch {
        res.status(404).send('Nu au fost gasite joburi!')
    }

})

module.exports = router