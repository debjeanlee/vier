const router = require('express').Router();

const Session = require('../models/session.models');

// -------- get active sessions --------- need table schema?
// router.get('/active', async (req, res) => {
//   const active = await Session.find({ active: 'true' });
//   res.status(200).json({ active });
// });

router.post('/new', async (req, res) => {
  try {
    const data = req.body;
    const length = await Session.countDocuments({}, (err, count) => count);
    const sessionId = length + 1;
    const sessionData = {
      table: data.table,
      sessionId,
    };
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
