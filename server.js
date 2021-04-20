const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const databaseStart = require('./config/databaseConfig')
//Import Routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')

dotenv.config()

//Connect to DB
databaseStart()
//Middlewares
app.use(express.json())

//Route Middlewares
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)

app.listen(3000, () => console.log(`**************************************
* SERVER RUNNING - BEM CASADO ONLINE *
**************************************
`))