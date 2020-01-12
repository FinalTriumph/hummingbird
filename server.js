const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();

app.set('views', path.join(__dirname, '/public/views'));
app.set('view engine', 'ejs');

const port = process.env.PORT || 5000;

app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: true
}));

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cookieParser());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Set language to be used in all router files
app.use(function(req, res, next) {
    const allowedLanguages = ['en', 'de', 'lv', 'ru'];
    let language = 'en';

    var match = req.url.match(/^\/([A-Z]{2})([\/\?].*)?$/i);
    // Url language
    if (match) {
      if (allowedLanguages.indexOf(match[1]) > -1) {
        language = match[1];
        req.lang = language;

        if (!req.cookies['language'] || req.cookies['language'] !== language) {
          res.cookie('language', language, { maxAge: 900000, httpOnly: true });
        }
      }
      req.url = match[2] || '/';
    }
    // Cookie language
    else if (req.cookies['language'] && allowedLanguages.indexOf(req.cookies['language']) > -1) {
        req.lang = req.cookies['language'];
    }
    else {
      req.lang = language;
    }
    next();
});

// Full
const publicRouter = require('./routes/public');
const adminRouter = require('./routes/admin');
app.use('/', publicRouter);
app.use('/admin', adminRouter);
// API
const productsApiRouter = require('./routes/api/products');
const adminApiRouter = require('./routes/api/admin');
app.use('/api/products', productsApiRouter);
app.use('/api/admin', adminApiRouter);

// All public assets
app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
