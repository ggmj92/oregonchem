const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const CategoryController = require("../controllers/CategoryController");
const PresentationController = require("../controllers/PresentationController");
const BannerController = require("../controllers/BannerController");
const {
  upload,
  firebaseStorageMiddleware,
} = require("../middlewares/firebaseStorageMiddleware");

const createUploadFields = (sites) => {
  return sites.map((site) => ({ name: site, maxCount: 1 }));
};

const sites = ["site1", "site2", "site3", "site4", "site5"];

// PRODUCTS
router.get("/productos", ProductController.getAllProducts);
router.get("/productos/:id/:site", ProductController.getProductByIdAndSite);

router.post(
  "/productos/nuevo",
  upload.fields(createUploadFields(sites)),
  firebaseStorageMiddleware,
  ProductController.createProduct
);

// CATEGORIES
router.get("/categorias", CategoryController.getAllCategories);
router.post(
  "/categorias/nueva",
  upload.fields(createUploadFields(sites)),
  firebaseStorageMiddleware,
  CategoryController.addCategory
);

// PRESENTATIONS
router.get("/presentaciones", PresentationController.getAllPresentations);
router.post(
  "/presentaciones/nueva",
  upload.fields(createUploadFields(sites)),
  firebaseStorageMiddleware,
  PresentationController.addPresentation
);
router.delete("/presentaciones/:id", PresentationController.deletePresentation);

// BANNERS
router.get("/banners", BannerController.getAllBanners);
router.post(
  "/banners/nuevo",
  upload.single("image"),
  firebaseStorageMiddleware,
  BannerController.addBanner
);

module.exports = router;
