const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    presentations: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Presentation" },
    ],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    siteData: [
      {
        site: {
          type: String,
          enum: ["site1", "site2", "site3", "site4", "site5"],
          required: true,
        },
        descriptions: { type: String },
        uses: { type: String },
        images: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
