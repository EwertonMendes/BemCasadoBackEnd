const mongoose = require('mongoose')

//Connect to DB
module.exports = function () {mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to DB'))}