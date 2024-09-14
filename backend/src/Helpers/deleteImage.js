// utils/deleteProjectImage.js
const fs = require("fs");
const path = require("path");

const deleteProjectImage = (imagePath) => {
  try {
    const fullPath = path.join(__dirname, "../../public/", imagePath);
    console.log(fullPath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log("Image deleted successfully");
    } else {
      console.log("Image file does not exist, so nothing to delete");
    }
  } catch (error) {
    console.error("Error deleting image: ", error);
  }
};

module.exports = deleteProjectImage;
