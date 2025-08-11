const express = require("express");
const router = express.Router();
const { authMiddleWare } = require("../../../middleware/authMiddleWare");
const CourtLocationController = require("../../../controllers/PickleBallCourt/CourtLocationController");
// const upload = require("../../../middleware/upload")
const uploadCourtImages = require("../../../middleware/uploadCourtImage");

router.post(
  "/create-court-location",
  authMiddleWare,
  uploadCourtImages,
  CourtLocationController.createLocation
);
router.get(
  "/get-court-location",
  authMiddleWare,
  CourtLocationController.getLocations
);
router.get("/get-detail/:id", CourtLocationController.getDetail);

router.post(
  "/update-location/:id",
  authMiddleWare,
  uploadCourtImages,
  CourtLocationController.updateLocation
);

module.exports = router;
