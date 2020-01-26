const router = require('express').Router();
let Product = require('../../models/product.model');

function checkAdmin(req, res, next) {
  const authorized = req.session.authorized;
  const username = req.session.username;
  const status = req.session.status;

  if (!authorized || !username || !username.length || status !== 'admin') {
    return res.json({status: 'error', message: 'Not authorized action'});
  }
  next();
}

router.route('/get/:id').get((req, res) => {
  // TODO
  // Product.find({active: true, _id: req.params.id})
  Product.findById(req.params.id)
    .then(product => res.json({status: 'ok', product}))
    .catch(err => res.json({status: 'error', message: 'Products not found'}));
});

router.route('/all').get((req, res) => {
  Product.find({active: true})
    .then(products => res.json({status: 'ok', products}))
    .catch(err => res.json({status: 'error', message: 'Product not found'}));
});

router.route('/best').get((req, res) => {
  Product.find({active: true, best: true})
    .then(products => res.json({status: 'ok', products}))
    .catch(err => res.json({status: 'error', message: 'Product not found'}));
});

router.route('/sale').get((req, res) => {
  Product.find({active: true, sale: true, salePrice: {$ne: null}, saleDiscount: {$ne: null}})
    .then(products => res.json({status: 'ok', products}))
    .catch(err => res.json({status: 'error', message: 'Product not found'}));
});

router.route('/admin').get(checkAdmin, (req, res) => {
  Product.find()
    .then(products => res.json({status: 'ok', products}))
    .catch(err => res.json({status: 'error', message: 'Product not found'}));
});

router.route('/get/edit/:id').get(checkAdmin, (req, res) => {
  Product.findById(req.params.id)
    .then(product => res.json({status: 'ok', product}))
    .catch(err => res.json({status: 'error', message: 'Products not found'}));
});

router.route('/add').post(checkAdmin, (req, res) => {
  const newProduct = new Product({
    image: req.body.image,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    active: req.body.active || false,
    weight: req.body.weight,
    best: req.body.best || false,
    sale: req.body.sale || false,
    salePrice: req.body.salePrice,
    saleDiscount: req.body.saleDiscount
  });

  newProduct.save()
    .then(() => res.json({status: 'ok'}))
    .catch(err => res.json({status: 'error', message: 'Product not saved: ' + err}));
});

router.route('/update/:id').post(checkAdmin, (req, res) => {
  Product.findByIdAndUpdate(req.params.id, {
      image: req.body.image,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      active: req.body.active || false,
      weight: req.body.weight,
      best: req.body.best || false,
      sale: req.body.sale || false,
      salePrice: req.body.salePrice,
      saleDiscount: req.body.saleDiscount
    })
    .then(() => res.json({status: 'ok'}))
    .catch(err => res.json({status: 'error', message: 'Product not updated: ' + err}));
});

// TODO Delete

module.exports = router;
