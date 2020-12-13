const router = require('express').Router();

const Session = require('../models/session.models');
const Table = require('../models/table.models');

/**
 * GET ONE SESSION BY TABLE NO
 * @method GET
 * @route '/api/session/:tableNo'
 * @returns single session - for customer side
 */
router.get('/:tableNo', async (req, res) => {
  try {
    const session = await Table.find({ tableNo: req.params.tableNo }).populate('sessionId');
    res.status(200).json({ session });
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' });
  }
});

/**
 * GETS ACTIVE SESSIONS
 * @method GET
 * @route '/api/session/active'
 * @returns list of active sessions
 */
router.get('/active', async (req, res) => {
  const sessions = await Session.find({ active: true });
  res.status(200).json({ sessions });
});

/**
 * CREATE NEW SESSION - needs table no
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

/**
 * END SESSION - needs table no
 * @method PATCH
 * @route '/api/session/:tableNo'
 * @param tableNo of the session to end
 * @summary sets session active status to false, adds endTime and removes session from table
 */
router.patch('/:tableNo', async (req, res) => {
  const table = await Table.findOne({ tableNo: req.params.tableNo });
  if (!table.sessionId) {
    return res.status(400).json({ message: 'No session found' });
  }
  try {
    await Session.findByIdAndUpdate(table.sessionId, {
      $set: { endTime: Date.now(), active: false },
    });
    table.sessionId = undefined;
    await table.save();
    res.status(200).json({ message: 'Session ended' });
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' });
  }
});
module.exports = router;
