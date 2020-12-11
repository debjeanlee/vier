const router = require('express').Router();

const Order = require('../models/order.models');
const Session = require('../models/session.models');

/**
 * GET ACTIVE ORDERS
 * @method GET
 * @route '/api/orders/active'
 * @returns only dish names in item list is populated
 * @description for kitchen use mostly
 */
router.get('/active', async (req, res) => {
  const orders = await Order.find({ completed: false }).populate('items.dish', 'name');
  res.status(200).json({ orders });
});

/**
 * CREATE NEW ORDER
 * @method PATCH
 * @route '/api/orders/new/:sessionid'
 * @params sessionid
 */
router.patch('/new/:sessionid', async (req, res) => {
  try {
    const session = await Session.findById(req.params.sessionid);
    await session.populate('cart.dish').execPopulate();
    let totalCost = 0;
    session.cart.forEach((item) => {
      totalCost += item.dish.price * item.quantity;
    });
    const items = [];
    session.cart.forEach((el) => {
      const obj = {
        dish: el.dish._id,
        quantity: el.quantity,
      };
      items.push(obj);
    });
    const orderNo = (await Order.countDocuments()) + 1;
    const order = new Order({
      orderNo,
      items,
      totalCost,
    });
    await order.save();
    session.orders.push(order._id);
    session.cart = [];
    await session.save();
    res.status(201).json({ message: 'Order has been placed' });
  } catch (err) {
    res.status(401).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
