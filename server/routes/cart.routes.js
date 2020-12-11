const router = require('express').Router();

const Session = require('../models/session.models');

async function addItem(session, req, res) {
  session.cart.push({ dish: req.body.dishId });
  await session.save();
  res.status(200).json({ message: 'Item added to cart' });
}

async function increaseQty(session, index, res) {
  session.cart[index].quantity += 1;
  await session.save();
  res.status(200).json({ message: 'Quantity of item increased' });
}

async function decreaseQty(session, index, res) {
  if (session.cart[index].quantity === 1) {
    session.cart.splice(index, 1);
    await session.save();
    res.status(200).json({ message: 'Item removed from cart' });
  } else {
    session.cart[index].quantity -= 1;
    await session.save();
    res.status(200).json({ message: 'Quantity of item decreased' });
  }
}

/**
 * GET ITEMS IN CART FROM SESSIONID
 * @method GET
 * @route '/api/cart/:sessionid'
 * @params sessionid
 * @returns All cart items
 */
router.get('/:sessionid', async (req, res) => {
  const session = await Session.findById(req.params.sessionid);
  await session.populate('cart.dish').execPopulate();
  res.status(200).json({ cart: session.cart });
});

/**
 * ADD ITEM TO CART / UPDATE QTY IF ITEM EXISTS
 * @method PATCH
 * @route '/api/cart/add/:sessionid'
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
      increaseQty(session, indexOfItem, res);
    } else {
      addItem(session, req, res);
    }
  }
});

/**
 * INCREASE QUANTITY OF ITEM IN CART BY 1
 * @method PATCH
 * @route '/api/cart/increase/:sessionid'
 * @params session id
 * @body dishId
 */
router.patch('/increase/:sessionid', async (req, res) => {
  const session = await Session.findById(req.params.sessionid);
  const indexOfItem = session.cart.findIndex((el) => String(el.dish) === req.body.dishId);
  try {
    increaseQty(session, indexOfItem, res);
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' });
  }
});

/**
 * DECREASE QUANTITY OF ITEM IN CART BY 1
 * @method PATCH
 * @route '/api/cart/decrease/:sessionid'
 * @params session id
 * @body dishId
 */
router.patch('/decrease/:sessionid', async (req, res) => {
  const session = await Session.findById(req.params.sessionid);
  const indexOfItem = session.cart.findIndex((el) => String(el.dish) === req.body.dishId);
  try {
    decreaseQty(session, indexOfItem, res);
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
