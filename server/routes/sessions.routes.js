const router = require('express').Router();

const Session = require('../models/session.models');
// const Table = require('../models/table.models');

// create new session & assign to table, takes table number in body, need to update table w session
router.post('/new', async (req, res) => {
  try {
    let count = await Session.countDocuments();
    count += 1;
    const session = new Session({ sessionId: count });
    await session.save().then(() => {
      res.status(201).json({ message: 'Session created' });
    });
  } catch (error) {
    res.status(401).json(error);
  }
});

module.exports = router;

// sessionId: { type: Number, required: true, unique: true },
//   startTime: { type: Date, default: Date.now },
//   endTime: { type: Date, default: Date.now },
//   table: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Table',
//   },
//   active: { type: Boolean, default: true },
//   orders: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Order',
//     },
//   ],
//   cart: [
//     {
//       dish: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Dish',
//       },
//       quantity: { type: Number, default: 1, required: true },
//     },
//   ],
// });
