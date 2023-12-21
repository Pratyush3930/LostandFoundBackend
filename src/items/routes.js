const { Router } = require("express");
const multer = require("multer");
const { uploadLostItem } = require("../items/controller");
// importing the file path to store lost items
const storage = multer.memoryStorage();

const controller = require("./controller");

const router = new Router();

router.get("/", controller.getItems);
// router.post('/', controller.lostItem);
// router.put("/:id", controller.foundItem);
router.post("/addItem", uploadLostItem, controller.addItem);
router.put('/updateStatus/:id' , controller.updateStatus);
// router.post('/uid', controller.addUid);
// router.get('/:id' , controller.getItemsById);
router.delete("/removeItem/:uid", controller.removeItem);
// router.put('/:id', controller.updateItems);

module.exports = router;
