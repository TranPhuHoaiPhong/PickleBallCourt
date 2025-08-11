const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Court = require("../../models/PickleBallCourt/Court/CourtModel");
const CourtLocation = require("../../models/PickleBallCourt/Court/CourtLocation");

const createCourt = async (name, priceHour, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      const locationID = await CourtLocation.findOne({ _id: location });

      if (!locationID) {
        reject({
          message: "Không có sân này",
        });
      }

      const newCourt = await Court.create({
        name,
        priceHour,
        location: locationID,
      });

      resolve({
        newCourt,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const allCourt = async () => {
  try {
    const courts = await Court.find().populate("location", "name");

    return courts; // async function sẽ tự wrap thành Promise
  } catch (error) {
    console.error(error);
    throw error; // để bên gọi handle
  }
};

const searchByAddress = async (addressKeyword) => {
  // Tìm các location theo địa chỉ
  const locations = await CourtLocation.find({
    address: { $regex: addressKeyword, $options: "i" },
  });

  // Với mỗi location, tìm danh sách courts của nó
  const results = [];
  for (const loc of locations) {
    const courts = await Court.find({ location: loc._id });
    results.push({
      ...loc.toObject(),
      courts,
    });
  }

  return results;
};

const updateCourt = async (courtId, updateData) => {
  const updatedCourt = await Court.findByIdAndUpdate(
    courtId,
    { $set: updateData },
    { new: true }
  ).populate("location");
  
  if (!updatedCourt) {
    throw new Error("Không tìm thấy sân");
  }
  return updatedCourt;
};

module.exports = {
  createCourt,
  allCourt,
  searchByAddress,
  updateCourt,
};
