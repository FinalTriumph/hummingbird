const router = require('express').Router();
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'Balibaba',
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 500, height: 500, crop: 'fill' }] // lfill
});

const parser = multer({ storage: storage });

function checkAdmin(req, res, next) {
  const authorized = req.session.authorized;
  const username = req.session.username;
  const status = req.session.status;

  if (!authorized || !username || !username.length || status !== 'admin') {
    return res.json({status: 'error', message: 'Not authorized action'});
  }
  next();
}

router.route('/upload').post(checkAdmin, parser.single('image'), (req, res) => {
  if (!req.file) {
    return res.json({status: 'error', message: "Couldn't upload image"});
  }

  const filename = req.file.public_id.split('/').reverse()[0] + '.' + req.file.format;
  return res.json({status: 'ok', filename});
});

router.route('/delete/:filename').get(checkAdmin, (req, res) => {
  const filename = req.params.filename || '';
  if (!filename.length) {
    return res.json({status: 'error', message: 'Empty filename'});
  }

  const targetFilename = 'Balibaba/' + filename.split('.')[0];

  cloudinary.v2.uploader.destroy(targetFilename, (err, result) => {
    if (err) return res.json({status: 'error', message: 'Failed to delete image - ' + err});
    return res.json({status: 'ok'});
  });
});

module.exports = router;
