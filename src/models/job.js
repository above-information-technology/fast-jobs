const mongoose = require('mongoose')
const validator = require('validator')

const Job = mongoose.model('Job', {
    jobOwner: {
        type: String,
        required: true,
        trim: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    beginDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    fullJob: {
        type: Boolean,
        required: true
    }
})

module.exports = Job