const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const ProductSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: {
    // English
    en: { type: String, required: true },
    // German
    de: { type: String, required: true },
    // Latvian
    lv: { type: String, required: true },
    // Russian
    ru: { type: String, required: true }
  },
  description: {
    // English
    en: { type: String, required: true },
    // German
    de: { type: String, required: true },
    // Latvian
    lv: { type: String, required: true },
    // Russian
    ru: { type: String, required: true }
  },
});
ProductSchema.plugin(timestamps);

module.exports = mongoose.model('Product', ProductSchema);
