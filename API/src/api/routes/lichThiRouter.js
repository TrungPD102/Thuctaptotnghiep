const lichThiController = require("../controllers/lichThiController");
const router = require("express").Router();

router.post("/createLichThi", lichThiController.createLichThi);
router.get("/getAllLichThi", lichThiController.getAllLichThi);
router.post("/getAllByQueryLichThi", lichThiController.getAllByQueryLichThi);
router.get("/getIdLichThi/:id", lichThiController.getIdLichThi);
router.get("/getLichThiByUserId/:userId", lichThiController.getLichThiByUserId);
router.patch("/updateLichThi/:id", lichThiController.updateLichThi);
router.delete("/deleteLichThi/:id", lichThiController.deleteLichThi);
router.patch("/updateMultipleLichThi", lichThiController.updateMultipleLichThi);

module.exports = router;
