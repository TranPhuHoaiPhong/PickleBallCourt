const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const Court = require("../../models/PickleBallCourt/Court/CourtModel")
const CourtLocation = require("../../models/PickleBallCourt/Court/CourtLocation")

const createCourt = async (courtData) => {
    const { name, priceHour, img, location} = courtData;

    const locationID = await CourtLocation.findOne({ _id: location });

    if (!locationID) {
        throw new Error("CourtLocation not found");
    }


    const newCourt = await Court.create({
        name,
        priceHour,
        location: locationID
    });

    return newCourt;
}

const allCourt = async () => {
  return await CourtLocation.find().populate('courts');
};

const searchByAddress = async (addressKeyword) => {
  // Tìm các location theo địa chỉ
  const locations = await CourtLocation.find({
    address: { $regex: addressKeyword, $options: 'i' }
  });

  // Với mỗi location, tìm danh sách courts của nó
  const results = [];
  for (const loc of locations) {
    const courts = await Court.find({ location: loc._id });
    results.push({
      ...loc.toObject(),
      courts
    });
  }

  return results;
};


module.exports = {
    createCourt,
    allCourt,
    searchByAddress
}

