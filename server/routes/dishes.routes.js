const router = require('express').Router();
const Dish = require('../models/dish.models');
const Category = require('../models/category.models');

/**
 * GETS LIST OF ALL DISHES
 * @method GET
 * @route '/api/dishes'
 * @returns list of all dishes with categories populated sorted by categories
 */
router.get('/', async (req, res) => {
  try {
    const allItems = await Dish.find().populate('category');
    const starters = allItems.filter((item) => item.category.name === 'Starters');
    const steak = allItems.filter((item) => item.category.name === 'Steak');
    const combo = allItems.filter((item) => item.category.name === 'Combo');
    const poultry = allItems.filter((item) => item.category.name === 'Poultry');
    const others = allItems.filter((item) => item.category.name === 'Others');
    const seafood = allItems.filter((item) => item.category.name === 'Seafood');
    const dessert = allItems.filter((item) => item.category.name === 'Desserts');
    const menuItems = [
      { category: 'Starters', items: starters },
      { category: 'Steak', items: steak },
      { category: 'Combo', items: combo },
      { category: 'Poultry', items: poultry },
      { category: 'Others', items: others },
      { category: 'Seafood', items: seafood },
      { category: 'Dessert', items: dessert },
    ];
    res.status(200).json({ menuItems });
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' });
  }
});

/**
 * GET LIST OF DISHES BASED ON CATEGORY
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

/**
 * GET SINGLE DISH VIA ID
 * @method GET
 * @route '/api/dishes/:dishId'
 * @params dishId
 * @returns info for single dish
 */
router.get('/:dishId', async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.dishId).populate('category');
    res.status(200).json({ dish });
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
