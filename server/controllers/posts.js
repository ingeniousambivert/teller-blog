const PostModel = require("../models/posts");

async function createPost(req, res) {
  const data = req.body;
  try {
    const newPost = new PostModel(data);
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(400).send("serverError");
  }
}

async function getPost(req, res) {
  const { id } = req.params;
  try {
    const post = await PostModel.findById(id)
      .populate("author")
      .populate("category");
    if (post) {
      return res.status(200).json(post);
    } else {
      return res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("serverError");
  }
}

async function getAllPosts(req, res) {
  try {
    const posts = await PostModel.find()
      .populate("author")
      .populate("category")
      .sort({ createdAt: -1 });
    if (posts) {
      return res.status(200).json(posts);
    } else {
      return res.status(404).json({ error: "Posts not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("serverError");
  }
}

async function updatePost(req, res) {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (user) {
      const updatedPost = await PostModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).json(updatedPost);
    } else {
      return res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("serverError");
  }
}

async function deletePost(req, res) {
  const { id } = req.params;
  try {
    const post = await PostModel.findById(id);
    if (post) {
      await UserModel.findByIdAndDelete(id);
      return res.status(200).json("Post Deleted");
    } else {
      return res.status(400).json({ error: "Post not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("serverError");
  }
}

module.exports = {
  createPost,
  getPost,
  getAllPosts,
  updatePost,
  deletePost,
};
