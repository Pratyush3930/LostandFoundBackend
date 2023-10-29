const {Router} = require('express');
const controller = require('./controller');
const passport = require('passport')
const router = Router();

router.post('/login' , controller.loginUser
// passport.authenticate('local' , {      //This passport method did not work so ask someone about it
//     successRedirect: '/home',
//     failureRedirect: '/login'
// })
);

router.post('/register' , controller.addUser);

router.get('/get-user-info' , controller.getUser)

module.exports = router;