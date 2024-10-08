const donVangThiController = require("../controllers/donVangThiController");
const router = require("express").Router();
const { uploadMinhChung } = require("../middlewares/upload");

router.post("/createDonVangThi", donVangThiController.createDonVangThi);
router.get("/getAllDonVangThi", donVangThiController.getAllDonVangThi);
router.post(
  "/getAllByQueryDonVangThi",
  donVangThiController.getAllByQueryDonVangThi
);
router.get("/getIdDonVangThi/:id", donVangThiController.getIdDonVangThi);
router.get(
  "/getDonVangThiByUserId/:userId", 
  donVangThiController.getDonVangThiByUserId
);

router.patch("/updateDonVangThi",donVangThiController.updateDonVangThi);
router.delete("/deleteDonVangThi/:id", donVangThiController.deleteDonVangThi);
router.post(
  "/uploadMinhChung",
  uploadMinhChung.single("minhChungFile"),
  donVangThiController.uploadMinhChung
);
module.exports = router;
