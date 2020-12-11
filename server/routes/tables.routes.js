const router = require('express').Router();

const Table = require('../models/table.models');

/**
 * FIND EMPTY TABLES
 * @method GET
 * @route '/api/tables/empty'
 * @returns list of empty tables
 */
router.get('/empty', async (req, res) => {
  try {
    const tables = await Table.find({ sessionId: undefined });
    res.status(200).json({ tables });
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' });
  }
});

/**
 * SHIFT SESSION FROM ONE TABLE TO ANOTHER
 * @method PATCH
 * @param tableNo takes current table no
 * @body takes new tableNo
 * @description shifts session from param table to body table
 */
router.patch('/:tableNo', async (req, res) => {
  const curTable = await Table.findOne({ tableNo: req.params.tableNo });
  try {
    await Table.findOneAndUpdate(
      { tableNo: req.body.tableNo },
      { $set: { sessionId: curTable.sessionId } }
    );
    curTable.sessionId = undefined;
    await curTable.save();
    res.status(200).json({
      message: `Session shifted from table ${req.params.tableNo} to table ${req.body.tableNo}`,
    });
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong ' });
  }
});

module.exports = router;
