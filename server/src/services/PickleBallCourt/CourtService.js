const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const Court = require("../../models/PickleBallCourt/Court/CourtModel")
const CourtLocation = require("../../models/PickleBallCourt/Court/CourtLocation")

const createCourt = async (courtData) => {
    const { name, addressDistrict, priceHour, img, locationId, googleMapLink} = courtData;

    const location = await CourtLocation.findOne({ _id: locationId });

    if (!location) {
        throw new Error("CourtLocation not found");
    }


    const newCourt = await Court.create({
        name,
        addressDistrict,
        priceHour,
        img,
        location: locationId,
        googleMapLink
    });


    location.courts.push(newCourt._id);
    await location.save();

    return newCourt;
}

const allCourt = async () => {
  return await CourtLocation.find().populate('courts');
};

const searchByAddress = async (addressKeyword) => {
    const locations = await CourtLocation.find({
        address: { $regex: addressKeyword, $options: 'i' }
    }).populate('courts');

  return locations;
}


module.exports = {
    createCourt,
    allCourt,
    searchByAddress
}

