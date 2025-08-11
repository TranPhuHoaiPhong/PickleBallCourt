const courtLocationService = require("../../services/PickleBallCourt/CourtLocationService");

const createLocation = async (req, res) => {
  try {
    const { name, address, email, phone, openTime, closeTime, googleMapLink } =
      req.body;
    const files = req.files;

    if (
      !name ||
      !address ||
      !email ||
      !phone ||
      !openTime ||
      !closeTime ||
      !files ||
      files.length === 0 ||
      !googleMapLink
    ) {
      return res
        .status(400)
        .json({ message: "Thiếu thông tin vui lòng kiểm tra lại!" });
    }

    const imgs = files.map((file) => file.filename);

    const location = await courtLocationService.createCourtLocation({
      name,
      address,
      email,
      phone,
      openTime,
      closeTime,
      imgs, // trùng với schema
      googleMapLink,
    });

    res.status(201).json(location);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

const getLocations = async (req, res) => {
  try {
    const locations = await courtLocationService.getAllCourtLocations();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

const getDetail = async (req, res) => {
  try {
    const locationId = req.params.id;
    const detail = await courtLocationService.getDetailCourtLocation(
      locationId
    );
    res.status(200).json(detail);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

const updateLocation = async (req, res) => {
  try {
    const id = req.params.id;

    const { name, address, email, phone, openTime, closeTime, googleMapLink } =
      req.body;
    const files = req.files;

    if (
      !name ||
      !address ||
      !email ||
      !phone ||
      !openTime ||
      !closeTime ||
      !files ||
      files.length === 0 ||
      !googleMapLink
    ) {
      return res
        .status(400)
        .json({ message: "Thiếu thông tin, vui lòng kiểm tra lại!" });
    }

    const imgs = files.map((file) => file.filename);

    const result = await courtLocationService.updateLocation(id, {
      name,
      address,
      email,
      phone,
      openTime,
      closeTime,
      googleMapLink,
      imgs,
    });

    return res.status(200).json({
      message: "Cập nhật địa điểm thành công!",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Lỗi server", error: error.message });
  }
};

module.exports = {
  createLocation,
  getLocations,
  getDetail,
  updateLocation,
};
