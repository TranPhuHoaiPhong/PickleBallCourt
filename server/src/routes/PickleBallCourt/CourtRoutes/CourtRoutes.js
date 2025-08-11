const express = require("express");
const router = express.Router();
const {
  authMiddleWare,
  VerifyUser,
} = require("../../../middleware/authMiddleWare");
const upload = require("../../../middleware/upload");
const CourtController = require("../../../controllers/PickleBallCourt/CourtController");

router.post("/create-court", authMiddleWare, CourtController.createCourt);
router.get("/all-court", CourtController.allCourt);
router.get("/search", CourtController.searchByAddress);
router.put("/update-court/:id", CourtController.updateCourt);

module.exports = router;
