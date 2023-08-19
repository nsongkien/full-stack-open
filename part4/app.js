const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use(middleware.tokenExtractor)

app.use('/api/users',userRouter)
app.use('/api/blogs',blogRouter)
app.use('/api/login',loginRouter)

app.use(middleware.errorHandler)

module.exports = app