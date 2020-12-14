const router = require('express').Router();

const Table = require('../models/table.models');

/**
 * GET ALL TABLES - for service side
 * @method GET
 * @route /api/tables
 * @returns list of all tables with sessions populated
 */
router.get('/', async (req, res) => {
  try {
    const tables = await Table.find()
      .populate({
        path: 'session',
        populate: [
          {
            path: 'orders',
            populate: {
              path: 'items.dish',
            },
          },
          {
            path: 'cart.dish',
          },
        ],
      })
      .exec();
    res.status(200).json({ tables });
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' });
  }
});

/**
 * GET ONE SESSION BY TABLE NO
 * @method GET
 * @route '/api/tables/:tableNo'
 * @returns single session - for customer side
 */
router.get('/:tableNo', async (req, res) => {
  try {
    const table = await Table.findOne({ tableNo: req.params.tableNo })
      .populate({
        path: 'session',
        populate: [
          {
            path: 'orders',
            populate: {
              path: 'items.dish',
            },
          },
          {
            path: 'cart.dish',
          },
        ],
      })
      .exec();
    if (table.session === undefined) {
      res.status(400).json({ message: 'Session does not exist' });
    } else {
      res.status(200).json({ table });
    }
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' });
  }
});

/**
 * FIND EMPTY TABLES
 * @method GET
 * @route '/api/tables/empty'
 * @returns list of empty tables
 */
router.get('/empty', async (req, res) => {
  try {
    const tables = await Table.find({ session: undefined });
    res.status(200).json({ tables });
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' });
  }
});

/**
 * SHIFT SESSION FROM ONE TABLE TO ANOTHER
 * @method PATCH
 * @route '/api/tables/:tableNo'
 * @param tableNo takes current table no
 * @body takes new tableNo
 * @description shifts session from param table to body table
 */
router.patch('/:tableNo', async (req, res) => {
  const curTable = await Table.findOne({ tableNo: req.params.tableNo });
  try {
    await Table.findOneAndUpdate(
      { tableNo: req.body.tableNo },
      { $set: { session: curTable.session } }
    );
    curTable.session = undefined;
    await curTable.save();
    res.status(200).json({
      message: `Session shifted from table ${req.params.tableNo} to table ${req.body.tableNo}`,
    });
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong ' });
  }
});

module.exports = router;
