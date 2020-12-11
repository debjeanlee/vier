const router = require('express').Router();

const Session = require('../models/session.models');
const Order = require('../models/order.models');
const Dish = require('../models/dish.models');

async function addItem(session, req, res) {
  session.cart.push({ dish: req.body.dishId });
  await session.save();
  res.status(200).json({ message: 'Item added to cart' });
}

/**
 * ADD ITEM TO CART / UPDATE QTY IF ITEM EXISTS
 * @method PATCH
 * @params session id
 * @body dish id
 */
router.patch('/add/:sessionid', async (req, res) => {
  const session = await Session.findById(req.params.sessionid);
  if (session.cart.length === 0) {
    try {
      addItem(session, req, res);
    } catch (err) {
      res.status(400).json({ message: 'Something went wrong' });
    }
  } else {
    const indexOfItem = session.cart.findIndex((el) => String(el.dish) === req.body.dishId);
    if (indexOfItem !== -1) {
      session.cart[indexOfItem].quantity += 1;
      await session.save();
      res.status(200).json({ message: 'Quantity of item increased' });
    } else {
      addItem(session, req, res);
    }
  }
});

module.exports = router;
