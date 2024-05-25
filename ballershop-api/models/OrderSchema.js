const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  email: { type: String, required: true }, 
  phone: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  address: { type: String, required: true },
  date: { type: Date, default: Date.now } 
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
