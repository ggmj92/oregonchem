const mongoose = require('mongoose');

const PresentationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, enum: ['solido', 'liquido'] },
}, { timestamps: true });

const Presentation = mongoose.model('Presentation', PresentationSchema);

module.exports = Presentation;