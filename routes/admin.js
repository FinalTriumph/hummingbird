const router = require('express').Router();
const session = require('express-session');

const headerItems = {
  'dashboard': { 'href': '/admin', 'title': 'Dashboard' },
  'products': { 'href': '/admin/products', 'title': 'Products' },
  'translations': { 'href': '/admin/translations', 'title': 'Translations' },
  'logout': { 'href': '/admin/logout', 'title': 'Logout' },
  //
  'public': { 'href': '/', 'title': 'Public side' }
};

const headerItemsNotAuthorized = {
  'public': { 'href': '/', 'title': 'Public side' }
};

function checkAdmin(req, res, next) {
  const authorized = req.session.authorized;
  const username = req.session.username;
  const status = req.session.status;

  if (!authorized || !username || !username.length || status !== 'admin') {
    return res.render('layouts/admin', {
      requestLang: req.lang,
      title: 'Login as administrator',
      view: 'login',
      headerItems: headerItemsNotAuthorized,
      activeHeaderItem: '',
      styles: ['elements/form'],
    });
  }

  next();
}

// Dashboard
router.route('/').get(checkAdmin, (req, res) => {
  res.render('layouts/admin', {
    requestLang: req.lang,
    title: 'Dashboard | Admin',
    view: 'dashboard',
    headerItems: headerItems,
    activeHeaderItem: 'dashboard',
  });
});

// Products
router.route('/products').get(checkAdmin, (req, res) => {
  res.render('layouts/admin', {
    requestLang: req.lang,
    title: 'Products | Admin',
    view: 'products',
    headerItems: headerItems,
    activeHeaderItem: 'products',
  });
});

router.route('/products/add').get(checkAdmin, (req, res) => {
  res.render('layouts/admin', {
    requestLang: req.lang,
    title: 'Add New Product | Admin',
    view: 'products/add',
    headerItems: headerItems,
    activeHeaderItem: '',
    styles: ['elements/form'],
  });
});

router.route('/products/edit/:id').get(checkAdmin, (req, res) => {
  res.render('layouts/admin', {
    requestLang: req.lang,
    title: 'Edit Product | Admin',
    view: 'products/edit',
    headerItems: headerItems,
    activeHeaderItem: '',
    styles: ['elements/form'],
  });
});

// Translations
router.route('/translations').get(checkAdmin, (req, res) => {
  res.render('layouts/admin', {
    requestLang: req.lang,
    title: 'Translations | Admin',
    view: 'translations',
    headerItems: headerItems,
    activeHeaderItem: 'translations',
  });
});

router.route('/translations/add').get(checkAdmin, (req, res) => {
  res.render('layouts/admin', {
    requestLang: req.lang,
    title: 'Add New Translation | Admin',
    view: 'translations/add',
    headerItems: headerItems,
    activeHeaderItem: '',
    styles: ['elements/form'],
  });
});

module.exports = router;
