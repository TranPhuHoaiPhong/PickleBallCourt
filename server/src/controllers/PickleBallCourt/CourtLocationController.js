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

module.exports = {
  createLocation,
  getLocations,
  getDetail,
};
