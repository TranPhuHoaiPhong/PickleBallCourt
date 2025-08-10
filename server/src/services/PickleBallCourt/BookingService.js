const Booking = require("../../models/PickleBallCourt/Court/CourtBooking");
const Court = require("../../models/PickleBallCourt/Court/CourtModel")
const Location = require("../../models/PickleBallCourt/Court/CourtLocation");

exports.createBooking = async (bookingList, user) => {
  // if (!Array.isArray(bookingList) || bookingList.length === 0) {
  //   throw new Error("Dữ liệu đặt sân không hợp lệ!");
  // }

  const newBookings = [];

  for (const data of bookingList) {
    const { courtId, date, startHour, endHour, totalPrice, name, phone } = data;

    if (!courtId || !date || !startHour || !endHour || !totalPrice || !name || !phone) {
      throw new Error("Thiếu thông tin đặt sân!");
    }

    // ⏰ Tạo thời gian theo múi giờ Việt Nam (GMT+7)
    const startTime = new Date(`${date}T${startHour}:00+07:00`);
    const endTime = new Date(`${date}T${endHour}:00+07:00`);

    if (startTime >= endTime) {
      throw new Error(`Thời gian không hợp lệ cho sân ${courtId}`);
    }

    const existing = await Booking.findOne({
      court: courtId,
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
      status: 'booked',
    });

    if (existing) {
      throw new Error(`Khung giờ đã được đặt ở sân ${courtId}`);
    }

    // Chưa tạo DB vội, chỉ thêm vào mảng tạm
    newBookings.push({
      court: courtId,
      user: user._id,
      startTime,
      endTime,
      totalPrice,
      name,
      phone
    });
  }

  // ✅ Tạo toàn bộ booking nếu không có lỗi nào
  const created = await Booking.insertMany(newBookings);
  return created;
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

exports.getCourtBooked = async (user) => {
  if(!user) {
    throw new Error('ID không tồn tại');
  }
  const bookings = await Booking.find({ user: user._id })
  .populate('court')
  .sort({ startTime: -1})

  return bookings
};