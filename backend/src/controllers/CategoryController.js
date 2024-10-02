const Category = require("../models/Category");

const CategoryController = {
  // GET ALL CATEGORIES
  async getAllCategories(req, res) {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // GET ONE CATEGORY BY ITS ID

  // ADD A CATEGORY
  async addCategory(req, res) {
    try {
      const { name } = req.body;
      const images = {
        site1: req.files["site1"] ? req.files["site1"][0].downloadURL : null,
        site2: req.files["site2"] ? req.files["site2"][0].downloadURL : null,
        site3: req.files["site3"] ? req.files["site3"][0].downloadURL : null,
        site4: req.files["site4"] ? req.files["site4"][0].downloadURL : null,
        site5: req.files["site5"] ? req.files["site5"][0].downloadURL : null,
      };

      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({ message: "Esa categoría ya existe" });
      }

      const category = new Category({ name, images });
      await category.save();
      res.status(201).json(category);
    } catch (error) {
      console.error("Error adding category:", error);
      res
        .status(500)
        .json({ message: "Error adding category", error: error.message });
    }
  },

  // UPDATE A CATEGORY

  // DELETE A CATEGORY
};

module.exports = CategoryController;
