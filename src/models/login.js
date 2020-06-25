const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})

loginSchema.statics.findByCredentials = async (username, password) => {
    const user = await Login.findOne({username, password})

    if (!user) {
        throw new Error("User not found!")
    }

    return user._id
}

const Login = mongoose.model('Login', loginSchema)

module.exports = Login