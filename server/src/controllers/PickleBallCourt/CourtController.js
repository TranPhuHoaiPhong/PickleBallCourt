const CourtService = require("../../services/PickleBallCourt/CourtService");

const createCourt = async (req, res) => {
  try {
    const { name, priceHour, location } = req.body;

    const results = await CourtService.createCourt(name, priceHour, location);
    return res.status(201).json(results);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const allCourt = async (req, res) => {
  try {
    const courts = await CourtService.allCourt(); // Gọi hàm lấy danh sách court
    res.status(200).json(courts);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const searchByAddress = async (req, res) => {
  try {
    const { address } = req.query;

    if (!address) {
      return res.status(400).json({ message: "Thiếu tham số address" });
    }

    const results = await CourtService.searchByAddress(address);
    res.status(200).json(results);
  } catch (error) {
    console.error("Lỗi tìm kiếm:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

const updateCourt = async (req, res) => {
  try {
    const courtId = req.params.id;
    const { name, priceHour, location } = req.body;

    if (!name || !priceHour || !location) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
    }

    const files = req.files || [];
    const imageFilenames = files.map(file => file.filename);

    const updatedCourt = await CourtService.updateCourt(courtId, {
      name,
      priceHour,
      location,
      images: imageFilenames.length > 0 ? imageFilenames : undefined
    });

    res.json({
      message: "Cập nhật sân thành công",
      data: updatedCourt
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

module.exports = {
  createCourt,
  allCourt,
  searchByAddress,
  updateCourt,
};
