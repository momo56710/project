const Category = require("../models/category");

// Map Mongoose errors to proper HTTP status codes
const handleError = (res, error, message) => {
  let status = 500;
  if (error.name === "ValidationError" || error.name === "CastError") {
    status = 400;
  } else if (error.code === 11000) {
    status = 409;
  }

  res.status(status).json({ message, error: error.message });
};

// Create a category
const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);

    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    handleError(res, error, "Error creating category");
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json(categories);
  } catch (error) {
    handleError(res, error, "Error retrieving categories");
  }
};

// Get one category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json(category);
  } catch (error) {
    handleError(res, error, "Error retrieving category");
  }
};

// Update a category
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    handleError(res, error, "Error updating category");
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    handleError(res, error, "Error deleting category");
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};