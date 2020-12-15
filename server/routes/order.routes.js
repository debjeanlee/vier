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

    if (session.cart.length === 0) {
      return res.status(401).json({ message: 'Cart is empty' });
    }

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

/**
 * CONFIRM ORDER
 * @method PATCH
 * @route '/api/orders/confirm/:orderid'
 * @params orderNo to confirm
 * @description sets progress of all order items to #2
 */
router.patch('/confirm/:orderNo', async (req, res) => {
  try {
    const order = await Order.findOne({ orderNo: req.params.orderNo });
    order.items = order.items.map((el) => {
      const obj = el;
      obj.progress = 2;
      return obj;
    });
    await order.save();
    res.status(200).json({ message: `Order ${req.params.orderNo} confirmed` });
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' });
  }
});

/**
 * UPDATE ITEM PROGRESS, UPDATES ORDER STATUS IF ALL ITEMS COMPLETE
 * @method PATCH
 * @route '/api/orders/items/:orderId'
 * @params orderId to find order
 * @body takes itemId in body to find item
 */
router.patch('/items/:id', async (req, res) => {
  try {
    // find order by id
    const order = await Order.findById(req.params.id);
    // find item
    const item = order.items.find((el) => String(el._id) === req.body.itemId);
    // check progress of item
    if (item.progress < 5) {
      item.progress += 1;
      // check if all order items are complete - i.e. progress = 5, returns false if one is not 5
      order.completed = order.items.every((el) => el.progress === 5);
      order.save();
      if (order.completed) {
        res.status(200).json({ message: 'Order complete' });
      } else {
        res.status(200).json({ message: 'Item progress updated' });
      }
    } else {
      res.status(400).json({ message: 'Order is complete' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
