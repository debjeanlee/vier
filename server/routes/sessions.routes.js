const router = require('express').Router();

const Session = require('../models/session.models');
const Table = require('../models/table.models');

// not sure if this is needed but putting it here first anyway
/**
 * @method GET
 * @route '/api/session/active'
 * @returns list of active sessions
 */
router.get('/active', async (req, res) => {
  const sessions = await Session.find({ active: true });
  res.status(200).json({ sessions });
});

/**
 * @method POST
 * @route '/api/session/new'
 * @body takes 'tableNo' in body to assign session to table on creation
 * @returns status of session creation
 */
router.post('/new', async (req, res) => {
  const table = await Table.findOne({ tableNo: req.body.tableNo });
  if (table.sessionId) {
    return res.status(401).json({ message: 'Table is occupied' });
  }
  try {
    let count = await Session.countDocuments();
    count += 1;
    const newSession = new Session({ sessionId: count });
    await newSession.save();
    table.sessionId = newSession._id;
    await table.save();
    res.status(201).json({ message: `Session created at Table ${table.tableNo}.` });
  } catch (err) {
    res.status(401).json({ message: 'Something went wrong.' });
  }
});

module.exports = router;
