const router = require('express').Router();
const request = require('request');

router.route('/get/:filename').get((req, res) => {
  const cloudinaryUrl = 'https://res.cloudinary.com/dpflvotoo/image/upload/v1581757980/Balibaba/';
  request.get(cloudinaryUrl + req.params.filename).pipe(res);
});

module.exports = router;
