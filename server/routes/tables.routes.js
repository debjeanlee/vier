const router = require('express').Router();

const Table = require('../models/table.models');

/**
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

module.exports = router;
