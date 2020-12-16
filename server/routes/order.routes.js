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
      return res.status(400).json({ message: 'Cart is empty' });
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
    const lastOrder = await Order.find().sort({ orderNo: -1 }).limit(1);
    const orderNo = lastOrder.length === 0 ? 1 : lastOrder[0].orderNo + 1;

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
    res.status(400).json({ message: 'Something went wrong' });
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
      obj.progress = 'Confirmed';
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
    order.status = 'Preparing';
    // find item
    const item = order.items.find((el) => String(el._id) === req.body.itemId);
    // check progress of item
    if (item.progress === 'Confirmed') {
      item.progress = 'Preparing';
    } else if (item.progress === 'Preparing') {
      item.progress = 'Ready';
    } else if (item.progress === 'Ready') {
      item.progress = 'Served';
    }
    // check if all items in order haven been served
    order.completed = order.items.every((el) => el.progress === 'Served');
    if (order.completed) {
      order.status = 'Completed';
    }
    order.save();
    console.log(order);
    res.status(200).json({ message: 'Item progress updated' });
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' });
  }
});

/**
 * DELETE ORDER
 * @method DELETE
 * @route '/api/orders/:orderId/:sessionId'
 * @params orderId sessionId
 * @description delete order by id, remove from session
 */
router.delete('/:orderId/:sessionId', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.orderId);
    await Session.findByIdAndUpdate(req.params.sessionId, {
      $pull: { orders: req.params.orderId },
    });
    res.status(200).json({ message: 'Order deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
