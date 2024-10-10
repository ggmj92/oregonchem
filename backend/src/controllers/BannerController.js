const Banner = require("../models/Banner");

const BannerController = {
  // GET ALL BANNERS
  async getAllBanners(req, res) {
    try {
      const banners = await Banner.find();
      res.json(banners);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // ADD A BANNER
  async addBanner(req, res) {
    try {
      const { name, site } = req.body;
      const imageFile = req.file;

      if (!imageFile) {
        return res.status(400).json({ message: "Image is required." });
      }

      const imageUrl = req.file.downloadURL;

      const newBanner = new Banner({ name, site, imageUrl });
      await newBanner.save();

      res
        .status(201)
        .json({ message: "Banner created successfully!", banner: newBanner });
    } catch (error) {
      console.error("Error creating banner:", error);
      res.status(500).json({ message: "Server error while creating banner." });
    }
  },
};

module.exports = BannerController;
