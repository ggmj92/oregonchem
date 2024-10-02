const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
    name: {
        site1: { type: String },
        site2: { type: String },
        site3: { type: String },
        site4: { type: String },
        site5: { type: String }
    },
    images: {
        site1: { type: String },
        site2: { type: String },
        site3: { type: String },
        site4: { type: String },
        site5: { type: String },
    },
    // links: {
    //     site1: { type: String },
    //     site2: { type: String },
    //     site3: { type: String },
    //     site4: { type: String },
    //     site5: { type: String },
    // },
}, { timestamps: true });

const Banner = mongoose.model('Banner', BannerSchema);

module.exports = Banner;
