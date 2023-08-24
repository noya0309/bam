const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/bamproject-api', 
    {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true})