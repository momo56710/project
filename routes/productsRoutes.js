const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts,
} = require('../controllers/productController');

// Create a new product
router.post('/', createProduct);

router.get("/", getAllProducts);
// Get product by ID
router.get('/:id', getProductById);

// Update product
router.put('/:id', updateProduct);

// Delete product
router.delete('/:id', deleteProduct);

module.exports = router; 