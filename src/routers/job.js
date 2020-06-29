const express = require('express')
const User = require('../models/user')
const Login = require('../models/login')
const { ObjectID } = require('mongodb')
const Job = require('../models/job')
const router = new express.Router()
const haversine = require('haversine')

router.post('/job', async (req, res) => {
    const job = new Job(req.body)

    try {

        await job.save()
        return res.status(201).send(job)

    } catch {

        return res.status(400).send('Jobul nu a putut fi creat!')

    }
})

router.get('/job/type', async (req, res) => {

    const type = req.query.type
    const start = {
        latitude: req.query.latitude,
        longitude: req.query.longitude
    } 
    
    try {

        const jobs = await Job.find({ type })
        console.log(type)



        const jobsWithDistance = jobs.map(job => {
            const end = {
                latitude: job.latitude,
                longitude: job.longitude
            }

            const distance = haversine(start, end, {unit: 'km'}).toFixed(1)

            return {
                distance,
                job
            }
        })

        jobsWithDistance.sort((a, b) => (a.distance > b.distance) ? 1 : -1)

        console.log(jobsWithDistance)
        
        return res.status(200).send(jobsWithDistance)

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

router.get('/job/cost', async (req, res) => {

    const lowCost = Number(req.query.lowCost)
    const highCost = Number(req.query.highCost)

    const start = {
        latitude: req.query.latitude,
        longitude: req.query.longitude
    }

    try {

        const jobs = await Job.find({ cost: { $gte: lowCost, $lte: highCost } })


        console.log(jobs)
        const jobsWithDistance = jobs.map(job => {
            const end = {
                latitude: job.latitude,
                longitude: job.longitude
            }

            const distance = haversine(start, end, {unit: 'km'}).toFixed(1)

            return {
                distance,
                job
            }
        })

        jobsWithDistance.sort((a, b) => (a.distance > b.distance) ? 1 : -1)

        return res.status(200).send(jobsWithDistance)


    } catch (e) {

        if (jobs.length == 0) {
            return res.status(404).send('Nu a fost gasit niciun job!')
        }

        return res.status(404).send(e.message)

    }

})

module.exports = router