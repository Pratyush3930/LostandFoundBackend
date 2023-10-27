const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.post('/login' , passport.authenticate["local" , {
    successRedirect : '/home',
    failureRedirect: '/login',
}]);

router.post('/register' , controller.addUser);

module.exports = router;