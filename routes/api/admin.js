const router = require('express').Router();
const bcrypt = require('bcryptjs');
const session = require('express-session');
let Admin = require('../../models/admin.model');

function adminIsAuthorized(sess) {
  if (typeof sess.username === 'undefined' || typeof sess.authorized === 'undefined' || typeof sess.status === 'undefined') {
    return false;
  }
  return (sess.username.length && sess.authorized && sess.status === 'admin');
}

router.route('/login').post((req, res) => {
  if (adminIsAuthorized(req.session)) {
    return res.json({'status': 'ok'});
  }

  const username = req.body.username;
  const password = req.body.password;

  Admin.findOne({'username': username}).then(doc => {
    if (!doc) return res.json({'status': 'error', 'message': 'User not found'});

    bcrypt.compare(password, doc.password, function(error, result) {
      if (!result) return res.json({'status': 'error', 'message': 'Invalid password'});

      req.session.username = username;
      req.session.authorized = true;
      req.session.status = 'admin';
      res.json({'status': 'ok'});
    });
  });
});

router.route('/logout').post((req, res) => {
  if (!adminIsAuthorized(req.session)) {
    return res.json({'status': 'ok'});
  }

  req.session.destroy(() => {
    res.json({'status': 'ok'});
  });
});

module.exports = router;
