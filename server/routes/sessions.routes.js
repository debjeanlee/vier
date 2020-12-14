const router = require('express').Router();

const Session = require('../models/session.models');
const Table = require('../models/table.models');

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
 * *MAYBE* GET SESSION BY ID
 */

/**
 * CREATE NEW SESSION - needs table no
 * @method POST
 * @route '/api/session/new'
 * @body takes 'tableNo' in body to assign session to table on creation
 * @returns status of session creation
 */
router.post('/new', async (req, res) => {
  const table = await Table.findOne({ tableNo: req.body.tableNo });
  if (table.session) {
    return res.status(401).json({ message: 'Table is occupied' });
  }
  try {
    let count = await Session.countDocuments();
    count += 1;
    const newSession = new Session({ session: count });
    await newSession.save();
    table.session = newSession._id;
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
  if (!table.session) {
    return res.status(400).json({ message: 'No session found' });
  }
  try {
    await Session.findByIdAndUpdate(table.session, {
      $set: { endTime: Date.now(), active: false },
    });
    table.session = undefined;
    await table.save();
    res.status(200).json({ message: 'Session ended' });
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' });
  }
});
module.exports = router;
