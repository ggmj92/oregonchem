const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image_1: { type: String },
    image_2: { type: String },
    image_3: { type: String },
    image_4: { type: String },
    image_5: { type: String },
}, { timestamps: true });

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;