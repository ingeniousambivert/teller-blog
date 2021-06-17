const createVerifyMail = (email, token, url) => {
  const link = `${url}/user/account/verify?email=${email}&token=${token}`;
  const mailOptions = {
    from: "no-reply@tellerblog.com",
    to: email,
    subject: "Account Verification",
    html: `Please verify your email by clicking this link - <a href="${link}" target="_blank">${link}</a>`,
  };
  return mailOptions;
};

module.exports = { createVerifyMail };
