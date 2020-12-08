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
