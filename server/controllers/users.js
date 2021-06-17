const crypto = require("crypto");
const mailer = require("nodemailer");
const { UserModel, TokenModel } = require("../models/users");
const {
  generateAccessToken,
  generateRefreshToken,
  isValidPassword,
  verifyAccessToken,
  verifyRefreshToken,
} = require("../auth");
const { gmailUsername, gmailPassword, clientUrl } = require("../config");
const client = require("../config/redis");
const { createVerifyMail } = require("../utils");

async function createUser(req, res) {
  const { firstname, lastname, email, password } = req.body;

  try {
    const foundUser = await UserModel.findOne({ email });
    if (foundUser) {
      return res.status(409).json({ error: "Email is already in use" });
    }
    const newUser = new UserModel({ firstname, lastname, email, password });
    await newUser.save((error) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      const token = new TokenModel({
        _userId: newUser._id,
        token: crypto.randomBytes(16).toString("hex"),
      });

      token.save(function (error) {
        if (error) {
          return res.status(500).json({ error: error.message });
        }

        const transporter = mailer.createTransport({
          service: "gmail",
          auth: {
            user: gmailUsername,
            pass: gmailPassword,
          },
        });
        const mailOptions = createVerifyMail(email, token.token, clientUrl);
        transporter.sendMail(mailOptions, function (err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.status(201).json({
            message: `Created User and sent verification email to ${newUser.email}`,
          });
        });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function authenticateUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      if (await isValidPassword(password, user)) {
        const { _id } = user;
        const accessToken = await generateAccessToken(_id);
        const refreshToken = await generateRefreshToken(_id);

        return res.status(200).json({ accessToken, refreshToken, id: _id });
      } else {
        return res.status(401).json({ error: "Password is invalid" });
      }
    } else {
      return res.status(401).json({ error: "Email is invalid" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function refreshUserAccess(req, res) {
  const { refreshToken } = req.body;
  try {
    const { isTokenValid, id } = await verifyRefreshToken(refreshToken);
    if (!isTokenValid) {
      return res.status(403).json({ error: "Access denied" });
    } else {
      const accessToken = await generateAccessToken(id);
      const newRefreshToken = await generateRefreshToken(id);
      return res
        .status(200)
        .json({ accessToken, refreshToken: newRefreshToken, id });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function revokeUserAccess(req, res) {
  const { refreshToken } = req.body;
  try {
    const { isTokenValid, id } = await verifyRefreshToken(refreshToken);
    if (!isTokenValid) {
      return res.status(403).json({ error: "Access denied" });
    } else {
      client.del(id, (err, val) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.sendStatus(204);
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getUser(req, res) {
  const { id } = req.params;
  try {
    const isTokenValid = verifyAccessToken(
      id,
      req.headers.authorization.split(" ")[1]
    );
    if (!isTokenValid) {
      return res.status(403).json({ error: "Access denied" });
    } else {
      const user = await UserModel.findById(id, { password: 0 });
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateUser(req, res) {
  const { id } = req.params;
  try {
    const isTokenValid = verifyAccessToken(
      id,
      req.headers.authorization.split(" ")[1]
    );
    if (!isTokenValid) {
      return res.status(403).json({ error: "Access denied" });
    } else {
      const user = await UserModel.findById(id);
      if (user) {
        const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        return res.status(200).json(updatedUser);
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const isTokenValid = verifyAccessToken(
      id,
      req.headers.authorization.split(" ")[1]
    );
    if (!isTokenValid) {
      return res.status(403).json({ error: "Access denied" });
    } else {
      const user = await UserModel.findById(id);
      if (user) {
        await UserModel.findByIdAndDelete(id);
        return res.status(200).json("Deleted User");
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function accountManagement(req, res) {
  const { type } = req.params;
  const { token, email } = req.body;

  try {
    switch (type.toString()) {
      case "verify-user":
        try {
          const verifyToken = await TokenModel.findOne({ token });
          if (!verifyToken)
            return res
              .status(400)
              .json({ error: "Token not found or token expired" });
          else {
            const user = await UserModel.findOne({
              _id: verifyToken._userId,
              email,
            });
            if (user) {
              user.isVerified = true;
              user.save(function (err) {
                if (err) {
                  return res.status(404).json({ error: "User not found" });
                }
                res
                  .status(200)
                  .json({ message: "User has been succesfully verified" });
              });
            } else {
              return res.status(404).json({ error: "User not found" });
            }
          }
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: "Internal Server Error" });
        }
        break;

      case "resend-verify-user":
        try {
          const user = await User.findOne({ email });
          if (user) {
            if (user.isVerified) {
              return res
                .status(400)
                .json({ error: "User is already verified" });
            } else {
              const token = new TokenModel({
                _userId: user._id,
                token: crypto.randomBytes(16).toString("hex"),
              });

              await token.save(function (error) {
                if (error) {
                  return res.status(500).json({ error: error.message });
                }

                const transporter = mailer.createTransport({
                  service: "gmail",
                  auth: {
                    user: gmailUsername,
                    pass: gmailPassword,
                  },
                });

                const mailOptions = createVerifyMail(
                  email,
                  token.token,
                  clientUrl
                );
                transporter.sendMail(mailOptions, function (err) {
                  if (err) {
                    return res.status(500).json({ error: err.message });
                  }
                  res.status(201).json({
                    message: `Resent verification email to ${user.email}`,
                  });
                });
              });
            }
          } else {
            return res.status(404).json({ error: "User not found" });
          }
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: "Internal Server Error" });
        }
        break;

      case "reset-password":
        break;

      default:
        res.status(400).json({ error: "Invalid type" });
        break;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  createUser,
  authenticateUser,
  refreshUserAccess,
  revokeUserAccess,
  getUser,
  updateUser,
  deleteUser,
  accountManagement,
};
