const express = require("express");
const router = express.Router();
const bookingController = require("../../../controllers/PickleBallCourt/BookingController");
const {VerifyUser} = require("../../../middleware/authMiddleWare");

router.post("/create", VerifyUser, bookingController.createBooking);
router.get('/all-bookings', bookingController.getAllBookings);
router.get("/available", bookingController.getAvailableCourts);

module.exports = router;
