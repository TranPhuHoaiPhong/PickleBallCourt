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

const updateLocation = async (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const location = await CourtLocation.findById(id);
      if (!location) {
        return reject({ status: 404, message: "Không tìm thấy địa điểm" });
      }

      // Cập nhật thông tin
      location.name = data.name;
      location.address = data.address;
      location.email = data.email;
      location.phone = data.phone;
      location.openTime = data.openTime;
      location.closeTime = data.closeTime;
      location.googleMapLink = data.googleMapLink;
      location.imgs = data.imgs;

      await location.save();

      resolve(location);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createCourtLocation,
  getAllCourtLocations,
  getDetailCourtLocation,
  updateLocation,
};
