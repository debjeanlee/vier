const mongoose = require('mongoose');

const { Schema } = mongoose;

const sessionSchema = new Schema({
  sessionId: { type: Number, required: true, unique: true },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date, default: Date.now },
  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table',
  },
  active: { type: Boolean, default: true },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
  cart: [
    {
      dish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish',
      },
      quantity: { type: Number, default: 1, required: true },
    },
  ],
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
