const router = require('express').Router();

const headerItems = {
  'home': {
    'href': '/',
    'title': 'Home'
  },
  'products': {
    'href': '/products',
    'title': 'Products'
  },
  'about': {
    'href': '/about',
    'title': 'About'
  },
  'contact': {
    'href': '/contact',
    'title': 'Contact'
  },
  'admin': {
    'href': '/admin',
    'title': '- Admin side -'
  }
};

// TODO
const mainStyles = ['elements/header', 'elements/footer'];

router.route('/').get((req, res) => {
  res.render('layouts/main', {
    title: 'Home',
    view: 'index',
    headerItems: headerItems,
    activeHeaderItem: 'home',
    styles: mainStyles
  });
});

router.route('/products').get((req, res) => {
  res.render('layouts/main', {
    title: 'Products',
    view: 'products',
    headerItems: headerItems,
    activeHeaderItem: 'products',
    styles: mainStyles
  });
});

router.route('/about').get((req, res) => {
  res.render('layouts/main', {
    title: 'About',
    view: 'about',
    headerItems: headerItems,
    activeHeaderItem: 'about',
    styles: mainStyles
  });
});

router.route('/contact').get((req, res) => {
  res.render('layouts/main', {
    title: 'Contact',
    view: 'contact',
    headerItems: headerItems,
    activeHeaderItem: 'contact',
    styles: mainStyles
  });
});

module.exports = router;
