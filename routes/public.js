const router = require('express').Router();

const headerItems = {
  'home': { 'href': '/', 'title': 'Home' },
  'products': { 'href': '/products', 'title': 'Products' },
  'about': { 'href': '/about', 'title': 'About' },
  'contact': { 'href': '/contact', 'title': 'Contact' },
  // TODO Only for development, will be removed
  'admin': { 'href': '/admin', 'title': '- Admin side -' }
};

router.route('/').get((req, res) => {
  res.render('layouts/main', {
    title: 'Home',
    view: 'index',
    headerItems: headerItems,
    activeHeaderItem: 'home'
  });
});

router.route('/products').get((req, res) => {
  res.render('layouts/main', {
    title: 'Products',
    view: 'products',
    headerItems: headerItems,
    activeHeaderItem: 'products'
  });
});

router.route('/about').get((req, res) => {
  res.render('layouts/main', {
    title: 'About',
    view: 'about',
    headerItems: headerItems,
    activeHeaderItem: 'about'
  });
});

router.route('/contact').get((req, res) => {
  res.render('layouts/main', {
    title: 'Contact',
    view: 'contact',
    headerItems: headerItems,
    activeHeaderItem: 'contact'
  });
});

module.exports = router;
