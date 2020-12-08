const router = require('express').Router();
const Category = require('../models/category.models');

/**
 * @method GET
 * @route '/api/categories'
 * @returns list of categories
 */
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (err) {
    res.sendStatus(400);
  }
});

module.exports = router;
