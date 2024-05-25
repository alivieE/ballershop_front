const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  category: { type: String, required: true }, //назва, рядкова
  name: { type: String, required: true }, //назва, рядкова
  state: { type: String, required: true }, //стан (новий/бв), рядкова
  price: { type: Number, required: true }, //ціна, число
  productImage: { type: String, required: true },  //адреса картинки
  imageUrls: { type: [String], required: true }, //масив з усіма картинками товару
  location: { type: String, required: true }, //місто або країна, з якого розміщено оголошення
  cushioning: { type: String}, //для взуття вид підошви
  traction: { type: String}, //для взуття як ковзає
  supportive: { type: String}, //для взуття наскільки фіксує
  lightweight: { type: String}, //вага
  durability: { type: String}, //наскільки довговічна річ
  signature: { type: String}, //унікальні деталі
  versatility: { type: String}, //наскільки різноманітна річ в застосуванні
  description: { type: String, required: true }, //опис
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true } // Reference to User model by ObjectId
});
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
