const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  orderNo: { type: Number, unique: true },
  items: [
    {
      dish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish',
      },
      quantity: { type: Number, default: 1, required: true },
      progress: { type: Number, default: 1, max: 5 },
    },
  ],
  totalCost: Number,
  orderedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
