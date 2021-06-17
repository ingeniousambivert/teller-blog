const express = require("express");
const { secureRoute } = require("../auth");
const {
  createCategory,
  getCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");

const router = express.Router();

router.get("/", getAllCategories);

router.get("/:id", getCategory);

router.post("/create", secureRoute, createCategory);

router.patch("/update/:id", secureRoute, updateCategory);

router.delete("/delete/:id", secureRoute, deleteCategory);

module.exports = router;
