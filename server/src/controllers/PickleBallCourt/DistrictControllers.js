const DistrictServices = require("../../services/PickleBallCourt/DistrictServices");

const createDistrict = async (req, res) => {
  try {
    const { districtName } = req.body;

    const result = await DistrictServices.createDistrict({ districtName });
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message || "Internal Server Error",
    });
  }
};

const getDistrict = async (req, res) => {
  try {
    const result = await DistrictServices.getDistrict();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  createDistrict,
  getDistrict,
};
