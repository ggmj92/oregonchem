const Product = require("../models/Product");

const ProductController = {
  // GET ALL PRODUCTS
  async getAllProducts(req, res) {
    try {
      const products = await Product.find()
        .populate("presentations")
        .populate("categories");
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Error fetching products", error });
    }
  },

  // CREATE A NEW PRODUCT
  async createProduct(req, res) {
    try {
      console.log("Request Body:", req.body);
      console.log("Request Files:", req.files);

      const { name, presentations, categories } = req.body;

      // Parse the presentations and categories from JSON strings
      const parsedPresentations = JSON.parse(presentations);
      const parsedCategories = JSON.parse(categories);

      const images = {
        site1: req.files["site1"] ? req.files["site1"][0].downloadURL : null,
        site2: req.files["site2"] ? req.files["site2"][0].downloadURL : null,
        site3: req.files["site3"] ? req.files["site3"][0].downloadURL : null,
        site4: req.files["site4"] ? req.files["site4"][0].downloadURL : null,
        site5: req.files["site5"] ? req.files["site5"][0].downloadURL : null,
      };

      const descriptions = JSON.parse(req.body.descriptions);

      const uses = JSON.parse(req.body.uses);

      const existingProduct = await Product.findOne({ name });
      if (existingProduct) {
        return res.status(400).json({ message: "Este producto ya existe" });
      }

      const product = new Product({
        name,
        presentations: parsedPresentations, // Use parsed presentations
        categories: parsedCategories, // Use parsed categories
        descriptions,
        uses,
        images,
      });

      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: "Error creating product", error });
    }
  },
};

module.exports = ProductController;
