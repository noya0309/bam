const express = require('express')
const User = require('./models/user');
const cors = require('cors')
require('./mongoose')
const userRouter = require('./routes/routes')

const app = express()
const port = process.env.PORT || 8080

app.use(cors());
app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log('server is on port' + port)
})