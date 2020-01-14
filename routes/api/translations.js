const router = require('express').Router();
let Translation = require('../../models/translation.model');

function checkAdmin(req, res, next) {
  const authorized = req.session.authorized;
  const username = req.session.username;
  const status = req.session.status;

  if (!authorized || !username || !username.length || status !== 'admin') {
    return res.json({'status': 'error', 'message': 'Not authorized action'});
  }
  next();
}

/* router.route('/get/:id').get((req, res) => {
  Product.find({_id: req.params.id})
    .then(product => res.json({'status': 'ok', 'product': product[0]}))
    .catch(err => res.json({'status': 'error', 'message': 'Products not found'}));
}); */

router.route('/all').get((req, res) => {
  Translation.find()
    .then(translations => res.json({'status': 'ok', translations}))
    .catch(err => res.json({'status': 'error', 'message': 'Translations not found'}));
});

router.route('/add').post(checkAdmin, (req, res) => {
  const newTranslation = new Translation({
    key: req.body.key,
    translations: req.body.translations
  });

  newTranslation.save()
    .then(() => res.json({'status': 'ok'}))
    .catch(err => res.json({'status': 'error', 'message': 'Translation not saved: ' + err}));
});

/* router.route('/update/:id').post(checkAdmin, (req, res) => {
  Product.updateOne({_id: req.params.id}, {
      image: req.body.image,
      title: req.body.title,
      description: req.body.description
    })
    .then(() => res.json({'status': 'ok'}))
    .catch(err => res.json({'status': 'error', 'message': 'Product not updated: ' + err}));
}); */

// TODO Delete

module.exports = router;
