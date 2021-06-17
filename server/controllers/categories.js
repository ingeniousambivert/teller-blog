const CategoryModel = require("../models/categories");

async function createCategory(req, res) {
  const data = req.body;
  try {
    const newCategory = new CategoryModel(data);
    await newCategory.save();
    res.status(200).json(newCategory);
  } catch (error) {
    console.log(error);
    res.status(400).send("serverError");
  }
}

async function getCategory(req, res) {
  const { id } = req.params;
  try {
    const category = await CategoryModel.findById(id);
    if (category) {
      return res.status(200).json(category);
    } else {
      return res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("serverError");
  }
}

async function getAllCategories(req, res) {
  try {
    const categories = await CategoryModel.find().sort({ name: 1 });
    if (categories) {
      return res.status(200).json(categories);
    } else {
      return res.status(404).json({ error: "Categories not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("serverError");
  }
}

async function updateCategory(req, res) {
  const { id } = req.params;
  try {
    const category = await UserModel.findById(id);
    if (category) {
      const updatedCategory = await CategoryModel.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        }
      );
      return res.status(200).json(updatedCategory);
    } else {
      return res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("serverError");
  }
}

async function deleteCategory(req, res) {
  const { id } = req.params;
  try {
    const category = await CategoryModel.findById(id);
    if (category) {
      await UserModel.findByIdAndDelete(id);
      return res.status(200).json("Category Deleted");
    } else {
      return res.status(400).json({ error: "Category not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("serverError");
  }
}

module.exports = {
  createCategory,
  getCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
