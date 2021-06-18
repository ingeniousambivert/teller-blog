const express = require("express");
const { secureRoute } = require("../auth");
const {
  createPost,
  getPost,
  getAllPosts,
  updatePost,
  deletePost,
} = require("../controllers/posts");

const router = express.Router();

router.get("/", getAllPosts);

router.get("/:id", getPost);

router.post("/create", secureRoute, createPost);

router.patch("/update/:id", secureRoute, updatePost);

router.delete("/delete/:id", secureRoute, deletePost);

module.exports = router;
