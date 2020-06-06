const mongoose = require('mongoose')

db = mongoose.connect('mongodb+srv://stefan:pungatomic2@fast-jobs-4v3xw.mongodb.net/fast-jobs?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
