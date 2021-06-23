const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const {
  PORT,
  MONGO_URI,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  GMAIL_USERNAME,
  GMAIL_PASSWORD,
  CLIENT_URL,
  CLOUDINARY_NAME,
  CLOUDINARY_KEY,
  CLOUDINARY_SECRET,
} = process.env;

assert(PORT, "PORT is required");
assert(MONGO_URI, "MONGO URI is required");
assert(ACCESS_TOKEN_SECRET, "ACCESS_TOKEN_SECRET is required");
assert(GMAIL_USERNAME, "GMAIL_USERNAME is required");
assert(GMAIL_PASSWORD, "GMAIL_PASSWORD is required");
assert(CLIENT_URL, "CLIENT_URL is required");
assert(CLOUDINARY_NAME, "CLOUDINARY_NAME is required");
assert(CLOUDINARY_KEY, "CLOUDINARY_KEY is required");
assert(CLOUDINARY_SECRET, "CLOUDINARY_SECRET is required");

module.exports = {
  port: PORT,
  mongoUri: MONGO_URI,
  accessSecret: ACCESS_TOKEN_SECRET,
  refreshSecret: REFRESH_TOKEN_SECRET,
  gmailUsername: GMAIL_USERNAME,
  gmailPassword: GMAIL_PASSWORD,
  clientUrl: CLIENT_URL,
  cloudinaryName: CLOUDINARY_NAME,
  cloudinaryKey: CLOUDINARY_KEY,
  cloudinarySecret: CLOUDINARY_SECRET,
};
