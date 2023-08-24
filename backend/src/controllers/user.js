const User = require('../models/user')
const Requ = require('../models/request')

exports.signup = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        console.log(e);

        res.status(400).send(e)
    }
}

exports.login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        console.log(e);
        res.status(400).send()
    }
}

exports.logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
        console.log(e);
    }}


exports.forgetpassword = async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username, qu: req.body.qu})
        if(!user){
            throw new Error('לא נמצא המשתמש')
        }
        else{
            user.password = req.body.password;
            await user.save()
            res.status(200).send({ user })
        }
    } catch (e) {
        console.log(e);
        res.status(400).send()
    }
}

exports.users = async (req, res) => {
    try {
        const user = await User.find({})
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
}

exports.oneuser = async (req, res) => {
    res.send(req.user)
}

exports.requser = async (req, res) => {
    try{
        await req.user.populate({
        path: 'request',
        options: {
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip),
        }
    }).execPopulate()
    res.send(req.user.request)
}catch(e){
    console.log(e);
    res.status(500).send(e)
}} 

exports.requ = async (req, res) => {
    const requ = new Requ({...req.body,
    owner: req.user._id
    })
    try {
        await requ.save()
        res.status(201).send(requ)
    } catch (e) {
        res.status(400).send(e)
    }
}

exports.getuser =  async (req, res) => {
    res.send(req.user)
}

exports.allrequests = async (req, res) => {
    try {
        const request = await Requ.find({confirmed: "הבקשה בהמתנה"})

for (let index = 0; index < request.length; index++) {
    await request[index].populate('owner').execPopulate();
}
        res.send(request)
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
}

exports.reqconf = async (req, res) => {
    try {
        const filter = await Requ.findOneAndUpdate({_id: req.body._id}, {confirmed: "הבקשה אושרה"});
        if (!filter) {
            return res.status(404).send()
        }
        res.send(filter)
    } catch (e) {
        res.status(400).send(e)
    }
}

exports.reqdec = async (req, res) => {
    try {
        const request = await Requ.findOneAndUpdate({_id: req.body._id}, {confirmed: "הבקשה סורבה", reason: req.body.reason});
        if (!request) {
            return res.status(404).send()
        }
        res.send(request)
    } catch (e) {
        res.status(400).send(e)
    }
}

exports.confrequ = async (req, res) => {
    try {
        const request = await Requ.find({$or: [{ confirmed: "הבקשה אושרה"}, { confirmed: "הבקשה סורבה" }]})
    for (let index = 0; index < request.length; index++) {
        await request[index].populate('owner').execPopulate();
}
        res.send(request)
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
}