const CourtLocation = require("../../models/PickleBallCourt/Court/CourtLocation");

const createCourtLocation = async ({ name, address, email, phone, openTime, closeTime }) => {
  const location = new CourtLocation({ name, address, email, phone, openTime, closeTime });
  return await location.save();
};

const getAllCourtLocations = async () => {
  return await CourtLocation.find().populate("courts");
};

const getDetailCourtLocation = async ( id ) => {
  const detail = await CourtLocation.findById(id);
  return detail

};

module.exports = {
  createCourtLocation,
  getAllCourtLocations,
  getDetailCourtLocation
};
