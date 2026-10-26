const express = require("express");
const router = express.Router();

const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// Create a category
router.post("/", createCategory);

// Get all categories
router.get("/", getAllCategories);

// Get one category by ID
router.get("/:id", getCategoryById);

// Update a category
router.put("/:id", updateCategory);

// Delete a category
router.delete("/:id", deleteCategory);

module.exports = router;