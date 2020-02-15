const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const ProductSchema = new mongoose.Schema({
  image: { type: String },
  imageSource: { type: String },
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
  price: { type: Number, required: true },
  active: { type: Boolean },
  weight: { type: Number },
  best: { type: Boolean },
  sale: { type: Boolean },
  salePrice: { type: Number },
  saleDiscount: { type: Number }
});
ProductSchema.plugin(timestamps);

module.exports = mongoose.model('Product', ProductSchema);
