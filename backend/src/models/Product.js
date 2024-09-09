const mongoose = require('mongoose');
const Category = require('./Category');
const Presentation = require('./Presentation');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description_1: { type: String },
    description_2: { type: String },
    description_3: { type: String },
    description_4: { type: String },
    description_5: { type: String },
    type: { type: String },
    presentations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Presentation' }],
    uses_1: { type: String },
    uses_2: { type: String },
    uses_3: { type: String },
    uses_4: { type: String },
    uses_5: { type: String },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    image_1: { type: String },
    image_2: { type: String },
    image_3: { type: String },
    image_4: { type: String },
    image_5: { type: String },
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;