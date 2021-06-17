const express = require("express");
const { secureRoute } = require("../auth");
const {
  createUser,
  authenticateUser,
  refreshUserAccess,
  revokeUserAccess,
  getUser,
  accountManagement,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const router = express.Router();

router.post("/auth/signup", createUser);

router.post("/auth/signin", authenticateUser);

router.post("/auth/refresh", secureRoute, refreshUserAccess);

router.delete("/auth/signout", secureRoute, revokeUserAccess);

router.post("/account/:type", accountManagement);

router.get("/:id", secureRoute, getUser);

router.patch("/update/:id", secureRoute, updateUser);

router.delete("/delete/:id", secureRoute, deleteUser);

module.exports = router;
