const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const {
  PORT,
  MONGO_URI,
  JWT_SECRET,
  GMAIL_USERNAME,
  GMAIL_PASSWORD,
  CLIENT_URL,
} = process.env;

assert(PORT, "PORT is required");
assert(MONGO_URI, "MONGO URI is required");
assert(JWT_SECRET, "JWT SECRET is required");

module.exports = {
  port: PORT,
  mongoUri: MONGO_URI,
  jwtSecret: JWT_SECRET,
  gmailUsername: GMAIL_USERNAME,
  gmailPassword: GMAIL_PASSWORD,
  clientUrl: CLIENT_URL,
};
