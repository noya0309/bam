const mongoose = require('mongoose')

const requestsschema = new mongoose.Schema({
    heading: {
        type: String,
        require: true,
        trim: true,
    },
    detail: {
        type: String,
        require: true,
        trim: true,
    },
    confirmed: {
        type: String,
        default: 'הבקשה בהמתנה'
    },
    reason: {
        type: String,
        require: false,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
}, {
    timestamps : true
})

const Requ = mongoose.model('Request', requestsschema)
module.exports = Requ