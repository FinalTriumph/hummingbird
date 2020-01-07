const express = require('express');
const session = require('express-session');
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

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
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
