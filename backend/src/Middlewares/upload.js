const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../../../frontend/public/projectImages");

    // Ensure the directory exists
    fs.mkdirSync(dir, { recursive: true });

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const extName = path.extname(file.originalname);
    cb(null, file.originalname.replace(extName, "") + extName);
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};

// Set up the multer middleware
const projectImageUpload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: fileFilter,
});

module.exports = projectImageUpload;
