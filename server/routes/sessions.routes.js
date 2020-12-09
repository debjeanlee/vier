const router = require('express').Router();

const Session = require('../models/session.models');
const Table = require('../models/table.models');

// create new session & assign to table, takes table number in body, need to update table w session
router.post('/new', async (req, res) => {
  try {
    const data = req.body;
    const selectedTable = await Table.findOne({ tableNo: data.tableNo });
    const length = await Session.countDocuments({}, (err, count) => count);
    const sessionId = length + 1;
    const newSession = new Session(sessionData);
    await newSession
      .save()
      .then(() => {
        res.status(201).json({ message: 'Session created' });
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({ message: 'Something went wrong' });
      });
  } catch (error) {
    res.status(401).json({ message: 'Something went wrong' });
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
