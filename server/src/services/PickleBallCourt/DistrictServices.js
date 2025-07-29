const District = require("../../models/PickleBallCourt/Court/District");

const createDistrict = async ({ districtName }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existing = await District.findOne({ districtName });

      if (existing) {
        return reject({
          message: "Quận đã tồn tại",
        });
      }

      const newDistrict = new District({ districtName });
      await newDistrict.save();

      resolve({
        message: "Đã tạo quận thành công!",
        district: newDistrict,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getDistrict = () => {
  return new Promise(async (resolve, reject) => {
    try {

        const district = await District.find();

        resolve({
            message: "Lấy danh sách thành công!",
            district
        })

    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createDistrict,
  getDistrict,
};
