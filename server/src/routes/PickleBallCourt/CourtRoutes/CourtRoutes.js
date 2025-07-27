const express = require("express")
const router = express.Router()
const { authMiddleWare, VerifyUser} = require("../../../middleware/authMiddleWare")
const upload = require("../../../middleware/upload")
const CourtController = require("../../../controllers/PickleBallCourt/CourtController")

router.post('/create-court', authMiddleWare, upload.single("image"), CourtController.createCourt)
router.get('/all-court', CourtController.allCourt)
router.get('/search', CourtController.searchByAddress);


module.exports = router