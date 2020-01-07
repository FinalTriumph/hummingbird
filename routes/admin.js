const router = require('express').Router();
const session = require('express-session');

const headerItems = {
  'dashboard': {
    'href': '/admin',
    'title': 'Dashboard'
  },
  'products': {
    'href': '/admin/products',
    'title': 'Products'
  },
  'translations': {
    'href': '/admin/translations',
    'title': 'Translations'
  },
  'logout': {
    'href': '/admin/logout',
    'title': 'Logout'
  },
  'public': {
    'href': '/',
    'title': '- Public side -'
  },
};

function checkAdmin(req, res, next) {
  const authorized = req.session.authorized;
  const username = req.session.username;
  const status = req.session.status;
  if (!authorized || !username || !username.length || status !== 'admin') {
    return res.render('layouts/admin', {
      title: 'Login as administrator',
      view: 'login',
      styles: ['admin/login', 'elements/form'],
      scripts: ['admin/login']
    });
  }
  next();
}

router.route('/').get(checkAdmin, (req, res) => {
  res.render('layouts/admin', {
    title: 'Dashboard | Admin',
    view: 'dashboard',
    headerItems: headerItems,
    activeHeaderItem: 'dashboard',
    styles: ['elements/header', 'admin/dashboard'],
    scripts: ['admin/logout']
  });
});

router.route('/products').get(checkAdmin, (req, res) => {
  res.render('layouts/admin', {
    title: 'Products | Admin',
    view: 'products',
    headerItems: headerItems,
    activeHeaderItem: 'products',
    styles: ['elements/header', 'admin/products'],
    scripts: ['admin/logout', 'admin/products']
  });
});

router.route('/products/add').get(checkAdmin, (req, res) => {
  res.render('layouts/admin', {
    title: 'Add New Product | Admin',
    view: 'products/add',
    headerItems: headerItems,
    activeHeaderItem: '',
    styles: ['elements/header', 'elements/form', 'admin/products'],
    scripts: ['admin/logout', 'admin/products']
  });
});

router.route('/products/edit/:id').get(checkAdmin, (req, res) => {
  res.render('layouts/admin', {
    title: 'Edit Product | Admin',
    view: 'products/edit',
    headerItems: headerItems,
    activeHeaderItem: '',
    styles: ['elements/header', 'elements/form', 'admin/products'],
    scripts: ['admin/logout', 'admin/products']
  });
});

router.route('/translations').get(checkAdmin, (req, res) => {
  res.render('layouts/admin', {
    title: 'Translations | Admin',
    view: 'translations',
    headerItems: headerItems,
    activeHeaderItem: 'translations',
    styles: ['elements/header'],
    scripts: ['admin/logout']
  });
});

module.exports = router;
