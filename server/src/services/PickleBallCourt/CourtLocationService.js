const CourtLocation = require("../../models/PickleBallCourt/Court/CourtLocation");

const createCourtLocation = async ({
  name,
  address,
  email,
  phone,
  openTime,
  closeTime,
  imgs,
  googleMapLink,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newLocation = new CourtLocation({
        name,
        address,
        email,
        phone,
        openTime,
        closeTime,
        imgs, // trùng với schema
        googleMapLink,
      });

      const saved = await newLocation.save();
      resolve(saved);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllCourtLocations = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const location = await CourtLocation.find();

      resolve(location);
    } catch (error) {
      console.log(error);
    }
  });
};

const getDetailCourtLocation = async (id) => {
  const detail = await CourtLocation.findById(id);
  return detail;
};

module.exports = {
  createCourtLocation,
  getAllCourtLocations,
  getDetailCourtLocation,
};
