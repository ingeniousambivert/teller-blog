const cloudinary = require("cloudinary");
const {
  cloudinaryName,
  cloudinaryKey,
  cloudinarySecret,
} = require("../../config");

cloudinary.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryKey,
  api_secret: cloudinarySecret,
});

module.exports = cloudinary;
