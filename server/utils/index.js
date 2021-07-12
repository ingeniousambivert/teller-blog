const mailer = require("nodemailer");
const { rm, existsSync, mkdirSync } = require("fs");
const { gmailUsername, gmailPassword } = require("../config");

const deleteDir = (dir) => {
  rm(dir, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
  });
};

const createDir = (dir) => {
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }
};

const createVerifyMail = (email, userId, token, url) => {
  console.log(`Sent verification email to ${email}`);
  const link = `${url}/user/account/verify?userId=${userId}&token=${token}`;
  const mailOptions = {
    from: "no-reply@tellerblog.com",
    to: email,
    subject: "Account Verification",
    html: `Please verify your email by clicking this link - <a href="${link}" target="_blank">${link}</a>`,
  };
  return mailOptions;
};

const createForgotPasswordMail = (email, userId, token, url) => {
  console.log(`Sent forgot password email to ${email}`);
  const link = `${url}/user/account/reset?userId=${userId}&token=${token}`;
  const mailOptions = {
    from: "no-reply@tellerblog.com",
    to: email,
    subject: "Forgot Your Password",
    html: `Please reset your password by visiting this link - <a href="${link}" target="_blank">${link}</a>`,
  };
  return mailOptions;
};

const createPasswordResetMail = (email, type = "reset") => {
  console.log(`Sent password reset email to ${email}`);
  const mailOptions = {
    from: "no-reply@tellerblog.com",
    to: email,
    subject: type === "reset" ? "Password Reset" : "Password Updated",
    html:
      type === "reset"
        ? "You have successfully reset your password"
        : "You have successfully updated your password",
  };
  return mailOptions;
};

const mailTransporter = mailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailUsername,
    pass: gmailPassword,
  },
});

const getIncrementDate = (increment) => {
  return new Date(new Date().setHours(new Date().getHours() + increment));
};

module.exports = {
  deleteDir,
  createDir,
  createVerifyMail,
  createForgotPasswordMail,
  createPasswordResetMail,
  mailTransporter,
  getIncrementDate,
};
