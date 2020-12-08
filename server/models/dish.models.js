const mongoose = require('mongoose');

const { Schema } = mongoose;

const dishSchema = new Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  description: String,
  img: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
