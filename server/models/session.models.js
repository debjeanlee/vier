const mongoose = require('mongoose');

const { Schema } = mongoose;

const sessionSchema = new Schema({
  session: { type: Number, required: true, unique: true },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date, default: undefined },
  active: { type: Boolean, default: true },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: false,
    },
  ],
  cart: [
    {
      dish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish',
      },
      quantity: { type: Number, default: 1, required: true },
      required: false,
    },
  ],
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
