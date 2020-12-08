const router = require('express').Router();
const Dish = require('../models/dish.models');
const Category = require('../models/category.models');

/**
 * @method GET
 * @route '/api/dishes/:category'
 * @returns list of starter dishes based on params
 */
router.get('/:category', async (req, res) => {
  const params = req.params.category;
  const cat = params.replace(params.charAt(0), params.charAt(0).toUpperCase());
  try {
    const category = await Category.findOne({ name: cat });
    const dishes = await Dish.find({ category: category._id });
    res.status(200).json({ dishes });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = router;
