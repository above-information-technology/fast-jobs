const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const applicantSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    jobId: {
        type: String,
        required: true
    }
})

const Applicant = mongoose.model('Applicant', applicantSchema)

module.exports = Applicant