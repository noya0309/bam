const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        trim: true,
    },
    qu: {
        type: String,
        require: true,
        trim: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userschema.virtual('request', { 
    ref: 'Request',
    localField:'_id',
    foreignField: 'owner'
})

userschema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userschema.statics.findByCredentials = async(username, password) => {
const user = await User.findOne({username})

if(!user){
    throw new Error('unable to login')
}
const isMatch = await bcrypt.compare(password, user.password)

if (!isMatch) {
    throw new Error('Unable to login')
}

return user
}

userschema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})
const User = mongoose.model('User', userschema)
module.exports = User  