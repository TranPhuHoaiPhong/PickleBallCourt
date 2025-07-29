const Booking = require("../../models/PickleBallCourt/Court/CourtBooking");
const Court = require("../../models/PickleBallCourt/Court/CourtModel")
const Location = require("../../models/PickleBallCourt/Court/CourtLocation");

exports.createBooking = async (data, user) => {
  const { courtId, date, startHour, endHour } = data;

  if (!courtId || !date || !startHour || !endHour) {
    throw new Error("Thiếu thông tin đặt sân!");
  }

  // ⏰ Tạo thời gian theo múi giờ Việt Nam (GMT+7)
  const startTime = new Date(`${date}T${startHour}:00+07:00`);
  const endTime = new Date(`${date}T${endHour}:00+07:00`);

  if (startTime >= endTime) {
    throw new Error("Thời gian không hợp lệ!");
  }

  // ❌ Kiểm tra trùng giờ đã đặt
  const existing = await Booking.findOne({
    court: courtId,
    startTime: { $lt: endTime },
    endTime: { $gt: startTime },
    status: 'booked'
  });

  if (existing) {
    throw new Error("Khung giờ này đã được đặt!");
  }

  // ✅ Tạo booking mới
  const booking = await Booking.create({
    court: courtId,
    user: user._id,
    startTime,
    endTime
  });

  return booking;
};


exports.getAllBookings = async (data, user) => {
  const bookings = await Booking.find({ status: 'booked' })
      .populate('court', 'name addressDistrict')  // Lấy thông tin sân
      .populate('user', 'name email')             // Nếu muốn lấy user (nếu có)
      .sort({ startTime: 1 }); 

  return bookings;
};

exports.findAvailableCourts = async (date, hour, duration = 1, locationId) => {
  const [hourInt, minuteInt] = hour.split(":").map(Number);
  const startTime = new Date(date);
  startTime.setHours(hourInt, minuteInt, 0, 0);

  const endTime = new Date(startTime);
  endTime.setHours(startTime.getHours() + Number(duration));

  const bookings = await Booking.find({
    $or: [
      { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
    ]
  });

  const bookedCourtIds = bookings.map(b => b.court.toString());

  const courts = await Court.find({
    _id: { $nin: bookedCourtIds },
    location: locationId,
  }).populate("location");

  return courts;
};

