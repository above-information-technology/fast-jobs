require('./db/mongoose')
const express = require('express')
const registerRouter = require('./routers/register')
const loginRouter = require('./routers/login')
const jobRouter = require('./routers/job')
const userRouter = require('./routers/user')
const applicantRouter = require('./routers/applicant')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(registerRouter)
app.use(loginRouter)
app.use(jobRouter)
app.use(userRouter)
app.use(applicantRouter)

app.get("/", (req, res) => {
    res.send("Router page")
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})