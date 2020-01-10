const router = require('express').Router();
let Product = require('../../models/product.model');

function checkAdmin(req, res, next) {
  const authorized = req.session.authorized;
  const username = req.session.username;
  const status = req.session.status;

  if (!authorized || !username || !username.length || status !== 'admin') {
    return res.json({'status': 'error', 'message': 'Not authorized action'});
  }
  next();
}

router.route('/get/:id').get((req, res) => {
  Product.find({_id: req.params.id})
    .then(product => res.json({'status': 'ok', 'product': product[0]}))
    .catch(err => res.json({'status': 'error', 'message': 'Products not found'}));
});

router.route('/all').get((req, res) => {
  Product.find()
    .then(products => res.json({'status': 'ok', products}))
    .catch(err => res.json({'status': 'error', 'message': 'Product not found'}));
});

router.route('/add').post(checkAdmin, (req, res) => {
  const newProduct = new Product({
    image: req.body.image,
    title: req.body.title,
    description: req.body.description
  });

  newProduct.save()
    .then(() => res.json({'status': 'ok'}))
    .catch(err => res.json({'status': 'error', 'message': 'Product not saved: ' + err}));
});

router.route('/update/:id').post(checkAdmin, (req, res) => {
  Product.updateOne({_id: req.params.id}, {
      image: req.body.image,
      title: req.body.title,
      description: req.body.description
    })
    .then(() => res.json({'status': 'ok'}))
    .catch(err => res.json({'status': 'error', 'message': 'Product not updated: ' + err}));
});

// TODO Delete

module.exports = router;
