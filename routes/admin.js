const router = require('express').Router();
const session = require('express-session');
const Translation = require('../models/translation.model');

const headerItems = {
  'dashboard': { 'href': '/admin', 'title': 't:Dashboard' },
  'products': { 'href': '/admin/products', 'title': 't:Products' },
  'translations': { 'href': '/admin/translations', 'title': 't:Translations' },
  'logout': { 'href': '/admin/logout', 'title': 't:Logout' },
  //
  'public': { 'href': '/', 'title': 't:Public' }
};

const headerItemsNotAuthorized = {
  'public': { 'href': '/', 'title': 't:Public' }
};

// Set translations for views
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

// Check if admin
function checkAdmin(req, res, next) {
  const authorized = req.session.authorized;
  const username = req.session.username;
  const status = req.session.status;

  if (!authorized || !username || !username.length || status !== 'admin') {
    return res.render('layouts/admin', {
      title: 'Login as administrator',
      view: 'login',
      headerItems: headerItemsNotAuthorized,
      activeHeaderItem: ''
    });
  }

  next();
}

// Dashboard
router.route('/').get(initTranslations, checkAdmin, (req, res) => {
  res.render('layouts/admin', {
    // translations: readyTranslations,
    title: 'Dashboard | Admin',
    view: 'dashboard',
    headerItems: headerItems,
    activeHeaderItem: 'dashboard',
  });
});

// Products
router.route('/products').get(initTranslations, checkAdmin, (req, res) => {
  res.render('layouts/admin', {
    // translations: readyTranslations,
    title: 'Products | Admin',
    view: 'products',
    headerItems: headerItems,
    activeHeaderItem: 'products',
  });
});

router.route('/products/add').get(initTranslations, checkAdmin, (req, res) => {
  res.render('layouts/admin', {
    // translations: readyTranslations,
    title: 'Add New Product | Admin',
    view: 'products/add',
    headerItems: headerItems,
    activeHeaderItem: ''
  });
});

router.route('/products/edit/:id').get(initTranslations, checkAdmin, (req, res) => {
  res.render('layouts/admin', {
    // translations: readyTranslations,
    title: 'Edit Product | Admin',
    view: 'products/edit',
    headerItems: headerItems,
    activeHeaderItem: ''
  });
});

// Translations
router.route('/translations').get(initTranslations, checkAdmin, (req, res) => {
  res.render('layouts/admin', {
    // translations: readyTranslations,
    title: 'Translations | Admin',
    view: 'translations',
    headerItems: headerItems,
    activeHeaderItem: 'translations',
  });
});

router.route('/translations/add').get(initTranslations, checkAdmin, (req, res) => {
  res.render('layouts/admin', {
    // translations: readyTranslations,
    title: 'Add New Translation | Admin',
    view: 'translations/add',
    headerItems: headerItems,
    activeHeaderItem: ''
  });
});

router.route('/translations/edit/:id').get(initTranslations, checkAdmin, (req, res) => {
  res.render('layouts/admin', {
    // translations: readyTranslations,
    title: 'Edit Translation | Admin',
    view: 'translations/edit',
    headerItems: headerItems,
    activeHeaderItem: ''
  });
});

module.exports = router;
