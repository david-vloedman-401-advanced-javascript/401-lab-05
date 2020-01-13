'use strict';

const mongoose = require('mongoose');
const Product = require('./models/productModel');



require('dotenv').config();

const products = new Product();



mongoose.connect(process.env.MONGOOSE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});


const productRecord = {
  name: 'david',
  amount: 23,
};



products
  .create(productRecord)
  .then(res => console.log(res))
  .catch(err => console.log(err));


products
  .get('david')
  .then(res => console.log(res))
  .catch(err => console.log(err));





