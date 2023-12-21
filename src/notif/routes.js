const {Router} = require('express');
const controller = require('./controller');
const router = Router();

router.post('/addNotif' , controller.addNotiInfo);
router.get('/getNotif/:id' , controller.getNotif);
router.delete('/removeNotif/:id' , controller.removeNotif);
router.put('/acceptNotif/:id' ,controller.acceptNotif);

module.exports  = router;