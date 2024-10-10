const Product = require("../models/Product");

const ProductController = {
  // Fetch all products
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find()
        .populate("presentations categories")
        .exec();

      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products", error });
    }
  },

  // Create a new product
  createProduct: async (req, res) => {
    try {
      const { name, presentations, categories, descriptions, uses } = req.body;
      const siteData = [];

      ["site1", "site2", "site3", "site4", "site5"].forEach((site, index) => {
        const description = descriptions[index];
        const use = uses[index];
        const imageFile = req.files[`site${index + 1}`];

        if (description || use || (imageFile && imageFile.length > 0)) {
          siteData.push({
            site: `site${index + 1}`,
            descriptions: description || "",
            uses: use || "",
            images:
              imageFile && imageFile.length > 0 ? imageFile[0].downloadURL : "",
          });
        }
      });

      const newProduct = new Product({
        name,
        presentations: JSON.parse(presentations),
        categories: JSON.parse(categories),
        siteData,
      });

      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Error creating product", error });
    }
  },

  getProductByIdAndSite: async (req, res) => {
    const { id, site } = req.params;

    try {
      const product = await Product.findById(id)
        .populate("presentations categories")
        .exec();

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const siteData = product.siteData.find((data) => data.site === site);

      if (!siteData) {
        return res
          .status(404)
          .json({ message: "No data for the requested site" });
      }

      const response = {
        name: product.name,
        presentations: product.presentations,
        categories: product.categories,
        descriptions: siteData.descriptions,
        uses: siteData.uses,
        images: siteData.images,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Error fetching product", error });
    }
  },
};

module.exports = ProductController;
