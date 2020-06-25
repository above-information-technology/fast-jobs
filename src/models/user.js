const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        validate(email) {
            if (!validator.isEmail(email)) {
                throw new Error("Invalid email")
            }
        }
    },
    username: {
        type: String
    },
    phoneNumber: {
        type: String,
    },
    rating: {
        type: Number,
        default: 0
    },
    numberOfRatings: {
        type: Number,
        default: 0
    }
})

userSchema.statics.findById

const User = mongoose.model('User', userSchema)

module.exports = User