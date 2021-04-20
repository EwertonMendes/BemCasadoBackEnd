const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const databaseStart = require('./config/databaseConfig')
//Import Routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')
const eventRoute = require('./routes/event')

dotenv.config()

//Connect to DB
databaseStart()

//Middlewares
app.use(express.json())

//Route Middlewares
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/event', eventRoute)

app.listen(3000, () => console.log(
`**************************************
* SERVER RUNNING - BEM CASADO ONLINE *
**************************************
`))