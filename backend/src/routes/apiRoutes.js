const express = require('express');
const router = express.Router();
// const ProductController = require('../controllers/ProductController');
// const CategoryController = require('../controllers/CategoryController');
// const PresentationController = require('../controllers/PresentationController');
// const BannerController = require('../controllers/BannerController');
const { upload, firebaseStorage } = require('../middlewares/firebaseStorageMiddleware');

// // PRODUCTS
// router.post('/productos/nuevo', upload.single('file'), firebaseStorage, ProductController.createProduct);
// router.get('/productos', ProductController.getAllProducts);
// router.get('/productos/:id', ProductController.getProductById);
// router.delete('/eliminar/productos/:id', ProductController.deleteProduct);
// router.get('/search', ProductController.searchProducts);

// // CATEGORIES
// router.get('/categorias', CategoryController.getAllCategories);
// router.get('/categorias/:id', CategoryController.getCategoryById);
// router.post('/categorias/nueva', upload.single('file'), firebaseStorage, CategoryController.addCategory);
// router.put('/categorias/:id', CategoryController.updateCategory);
// router.delete('/categorias/:id', CategoryController.deleteCategory);

// // PRESENTATIONS
// router.get('/presentaciones', PresentationController.getAllPresentations);
// router.post('/presentaciones/nueva', PresentationController.addPresentation);
// router.put('/presentaciones/:id', PresentationController.updatePresentation);
// router.delete('/presentaciones/:id', PresentationController.deletePresentation);

// // BANNERS
// router.get('/banners', BannerController.getAllBanners);
// router.post('/banners/new', upload.single('file'), firebaseStorage, BannerController.addBanner);
// router.delete('/banners/:id', BannerController.deleteBanner);



module.exports = router;