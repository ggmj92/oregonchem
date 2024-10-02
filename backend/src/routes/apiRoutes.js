const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const CategoryController = require('../controllers/CategoryController');
const PresentationController = require('../controllers/PresentationController');
const { upload, firebaseStorageMiddleware } = require('../middlewares/firebaseStorageMiddleware');

// PRODUCTS
router.get('/productos', ProductController.getAllProducts);
router.post('/productos/nuevo', upload.fields([
    { name: 'site1', maxCount: 1 },
    { name: 'site2', maxCount: 1 },
    { name: 'site3', maxCount: 1 },
    { name: 'site4', maxCount: 1 },
    { name: 'site5', maxCount: 1 }
]), firebaseStorageMiddleware, ProductController.createProduct);

// CATEGORIES
router.get('/categorias', CategoryController.getAllCategories);
router.post('/categorias/nueva', upload.fields([
    { name: 'site1', maxCount: 1 },
    { name: 'site2', maxCount: 1 },
    { name: 'site3', maxCount: 1 },
    { name: 'site4', maxCount: 1 },
    { name: 'site5', maxCount: 1 }
]), firebaseStorageMiddleware, CategoryController.addCategory);

// PRESENTATIONS
router.get('/presentaciones', PresentationController.getAllPresentations);
router.post('/presentaciones/nueva', PresentationController.addPresentation);
router.put('/presentaciones/:id', PresentationController.updatePresentation);
router.delete('/presentaciones/:id', PresentationController.deletePresentation);

module.exports = router;
