const BookingService = require('../../services/PickleBallCourt/BookingService');

const createBooking = async (req, res) => {
  try {
    const booking = await BookingService.createBooking(req.body, req.user);
    return res.status(201).json({
      message: "Đặt sân thành công!",
      booking
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await BookingService.getAllBookings (req.body, req.user);
    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAvailableCourts = async (req, res) => {
  try {
    const { date, hour, duration, locationId } = req.query;

    if (!date || !hour || !duration || !locationId) {
      return res.status(400).json({ message: "Missing the input" });
    }

    const availableCourts = await BookingService.findAvailableCourts(date, hour, duration, locationId);

    res.status(200).json({ availableCourts });
  } catch (error) {
    console.error("Error in controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCourtBooked = async (req, res) => {
  try {
    const user = req.user._id
    const bookings = await BookingService.getCourtBooked(user);
    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getAvailableCourts,
  getCourtBooked
};
