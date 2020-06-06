const mongoose = require('mongoose')
const validator = require('validator')

const Job = mongoose.model('Job', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    domain: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        latitude: {
            type: String,
            required: true
        },
        longitude: {
            type: String,
            required: true
        }
    }
})

module.exports = Job