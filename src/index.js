require('./db/mongoose')
const express = require('express')
const registerRouter = require('./routers/register')
const loginRouter = require('./routers/login')
const jobRouter = require('./routers/job')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(registerRouter)
app.use(loginRouter)
app.use(jobRouter)

app.get("/", (req, res) => {
    res.send("Router page")
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})