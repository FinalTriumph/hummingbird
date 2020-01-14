const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const TranslationSchema = new mongoose.Schema({
  key: { type: String, required: true, index: { unique: true } },
  translations: {
    // English
    en: { type: String, required: true },
    // German
    de: { type: String, required: true },
    // Latvian
    lv: { type: String, required: true },
    // Russian
    ru: { type: String, required: true }
  }
});
TranslationSchema.plugin(timestamps);

module.exports = mongoose.model('Translation', TranslationSchema);
