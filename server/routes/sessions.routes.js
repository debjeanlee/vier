const router = require('express').Router();

const Session = require('../models/session.models');
const Table = require('../models/table.models');

// create new session & assign to table, takes table number in body, need to update table w session
/**
 * @method POST
 * @route '/api/session/new'
 * @body takes 'tableNo' in body to assign session to table on creation
 * @returns status of session creation
 */
router.post('/new', async (req, res) => {
  if (!req.body.tableNo) {
    res.status(401).json({ message: 'No table selected' });
  } else {
    const table = await Table.findOne({ tableNo: req.body.tableNo });
    if (table.sessionId) {
      res.status(401).json({ message: 'Table is occupied' });
    } else {
      try {
        let count = await Session.countDocuments();
        count += 1;
        const newSession = new Session({ sessionId: count });
        await newSession.save().then(async () => {
          await Table.findByIdAndUpdate(table._id, { $set: { sessionId: newSession._id } });
          res.status(201).json({ message: `Session created at Table ${table.tableNo}.` });
        });
      } catch (err) {
        res.status(401).json({ message: 'Something went wrong.' });
      }
    }
  }
});

module.exports = router;
