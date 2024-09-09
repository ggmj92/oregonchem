const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },

    // description: { type: String }, // Optional: Description for the banner
    // link: { type: String }, // Optional: Link to navigate when the banner is clicked
}, { timestamps: true });

const Banner = mongoose.model('Banner', BannerSchema);

module.exports = Banner;