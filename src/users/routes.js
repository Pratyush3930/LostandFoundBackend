const {Router} = require('express');
const controller = require('./controller');
const router = Router();

router.post('/login' , controller.loginUser
// passport.authenticate('local' , {      //This passport method did not work so ask someone about it
//     successRedirect: '/home',
//     failureRedirect: '/login'
// })
);

router.post('/register' , controller.addUser);

// router.get('/get-user-info' , controller.getUser)

router.put('/updateInfo', controller.updateUser);

router.put('/updatePassword', controller.updatePassword);

router.post('/checkPassword', controller.checkPassword);

module.exports = router;