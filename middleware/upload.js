const multer = require('multer');
const path = require('path');

// Destination folder for prescription uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/prescriptions');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

// Validate file types and size (PDF, JPG, JPEG, PNG) max 5MB
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, JPG, JPEG, and PNG files are allowed.'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter
});

module.exports = upload;
