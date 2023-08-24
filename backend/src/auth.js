const jwt = require('jsonwebtoken')
const User = require('./models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismynewcourse')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        console.log(e);
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

const adminAuth = async (req, res, next) => {
    if(req.user.isAdmin){
    next()
}
    else{
        res.status(403).send({ error: 'אין הרשאה' })
    }
}

module.exports = {auth, adminAuth}
