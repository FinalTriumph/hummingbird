const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const ProductSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: {
    // English
    en: { type: String, required: true },
    // German
    de: { type: String },
    // Latvian
    lv: { type: String },
    // Russian
    ru: { type: String }
  },
  description: {
    // English
    en: { type: String, required: true },
    // German
    de: { type: String },
    // Latvian
    lv: { type: String },
    // Russian
    ru: { type: String }
  },
});
ProductSchema.plugin(timestamps);

module.exports = mongoose.model('Product', ProductSchema);
