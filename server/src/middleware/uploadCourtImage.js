const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Tạo thư mục lưu ảnh nếu chưa tồn tại
const uploadsDir = path.join(__dirname, "../uploads/court");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Cấu hình lưu file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Middleware upload
const uploadCourtImages = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // giới hạn 1MB / ảnh
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Chỉ hỗ trợ định dạng .jpeg, .jpg, .png"));
    }
  },
}).array("courtImages", 5); // tên field = 'courtImages', tối đa 5 ảnh

module.exports = uploadCourtImages;
