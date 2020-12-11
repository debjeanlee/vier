const router = require('express').Router();
const { newToken, initiatePayment } = require('../helpers/payment');

/**
 * @method POST
 * @route '/api/payment/token'
 * @returns payment token
 */
router.post('/token', async (req, res) => {
  const token = await newToken();
  res.json({ secret: token.secret });
});

/**
 * @method GET
 * @route '/api/payment/secret'
 * @returns payment secret
 */
router.get('/new', async (req, res) => {
  const newPayment = await initiatePayment(req.query.amount);
  res.json({ secret: newPayment.client_secret });
});

module.exports = router;
