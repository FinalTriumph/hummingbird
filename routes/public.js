const router = require('express').Router();
const Translation = require('../models/translation.model');

const headerItems = {
  'home': { 'href': '/', 'title': 't:Home' },
  'products': { 'href': '/products', 'title': 't:Products' },
  'about': { 'href': '/about', 'title': 't:About' },
  'contact': { 'href': '/contact', 'title': 't:Contact' },
  // TODO Only for development, will be removed
  'admin': { 'href': '/admin', 'title': 't:Admin' }
};

const categories = {
  'all': { 'href': '/products', 'title': 't:All Products' },
  'best': { 'href': '/products?category=best', 'title': 't:Top Offers' },
  'sale': { 'href': '/products?category=sale', 'title': 't:Sale' },
};

// Set target language and translations for views
function initTranslations(req, res, next) {
  res.locals.translations = {};
  Translation.find({}).then(docs => {
    if (!docs) next();
    docs.forEach(item => {
      res.locals.translations[item.key] = item.translations[language];
    });
    next();
  });
};

router.route('/').get(initTranslations, (req, res) => {
  res.render('layouts/main', {
    title: 'Home',
    view: 'index',
    headerItems: headerItems,
    activeHeaderItem: 'home'
  });
});

router.route('/products').get(initTranslations, (req, res) => {
  const category = (req.query.category && categories.hasOwnProperty(req.query.category)) ? req.query.category : 'all';
  res.render('layouts/main', {
    title: 'Products',
    view: 'products',
    headerItems: headerItems,
    activeHeaderItem: 'products',
    categories: categories,
    activeCategory: category,
    activeCategoryTitle: categories[category].title
  });
});

router.route('/about').get(initTranslations, (req, res) => {
  res.render('layouts/main', {
    title: 'About',
    view: 'about',
    headerItems: headerItems,
    activeHeaderItem: 'about'
  });
});

router.route('/contact').get(initTranslations, (req, res) => {
  res.render('layouts/main', {
    title: 'Contact',
    view: 'contact',
    headerItems: headerItems,
    activeHeaderItem: 'contact'
  });
});

module.exports = router;
