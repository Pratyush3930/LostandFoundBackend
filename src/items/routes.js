const {Router} = require('express');
const controller = require('./controller');

const router = new Router();

router.get('/' , controller.getItems);
// router.post('/', controller.lostItem);
router.put('/:id', controller.foundItem);
router.post('/addItem' , controller.addItem);
// router.post('/uid', controller.addUid);
// router.get('/:id' , controller.getItemsById);
// router.delete('/:id' , controller.removeItems);
// router.put('/:id', controller.updateItems);

module.exports = router;