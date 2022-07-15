
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: Number,
  pictureUrl: String,
  wmStatus:Number,
  exp:Number,
  price:Number
});

const WMdata = mongoose.model('WMdata', productSchema);
module.exports = WMdata;