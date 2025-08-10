const express = require("express")
const router = express.Router()
const { authMiddleWare} = require("../../../middleware/authMiddleWare")
const CourtLocationController = require("../../../controllers/PickleBallCourt/CourtLocationController")
const upload = require("../../../middleware/upload")

router.post('/create-court-location', authMiddleWare, upload.single("image"), CourtLocationController.createLocation)
router.post('/get-court-location', authMiddleWare, CourtLocationController.getLocations)
router.get('/get-detail/:id', CourtLocationController.getDetail)


module.exports = router