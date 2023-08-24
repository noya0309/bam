const router = require('express').Router()
const {auth, adminAuth} = require('../auth')
const controllers = require('../controllers/user')

router.post('/users/signup', controllers.signup);
router.post('/users/login', controllers.login);
router.post('/logout' , auth, controllers.logout);
router.post('/users/forgetpassword', controllers.forgetpassword);
router.post('/requ', auth, controllers.requ);
router.get('/users', controllers.users);
router.get('/allrequest', auth, adminAuth, controllers.allrequests);
router.get('/users/one', auth, controllers.oneuser)
router.get('/users/me', auth, controllers.getuser)
router.get('/requ/user', auth, controllers.requser)
router.patch('/reqconf', auth, controllers.reqconf)
router.patch('/reqdec',auth , controllers.reqdec)
router.get('/confrequ', auth, controllers.confrequ)

module.exports = router