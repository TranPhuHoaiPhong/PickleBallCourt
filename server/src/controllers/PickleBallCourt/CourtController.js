const CourtService = require('../../services/PickleBallCourt/CourtService');

const createCourt = async (req, res) => {
  try {
    const imagePath = req.file ? `/upload/${req.file.filename}` : null;

    const court = await CourtService.createCourt({
      ...req.body,
      image: imagePath,
    });
    res.status(201).json({ success: true, data: court });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const allCourt = async (req, res) => {
  try {
    const courts = await CourtService.allCourt(); // Gọi hàm lấy danh sách court
    res.status(200).json({ success: true, data: courts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const searchByAddress = async (req, res) => {
  try {
    const { address } = req.query;

    if (!address) {
      return res.status(400).json({ message: 'Thiếu tham số address' });
    }

    const results = await CourtService.searchByAddress(address);
    res.status(200).json(results);
  } catch (error) {
    console.error('Lỗi tìm kiếm:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

module.exports = {
  createCourt,
  allCourt,
  searchByAddress
};
