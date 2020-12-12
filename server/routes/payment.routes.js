const router = require('express').Router();
const { newToken, initiatePayment, capturePayment } = require('../helpers/payment');

/**
 * @method GET
 * @route '/api/payment/secret'
 * @returns payment secret
 */
router.get('/new', async (req, res) => {
  try {
    const newPayment = await initiatePayment(req.query.amount);
    res.status(200).json({ intent: newPayment });
  } catch (error) {
    res.sendStatus(403);
  }
});

/**
 * @method POST
 * @route '/api/payment/capture'
 * @returns successful payment result
 */
router.post('/capture', async (req, res) => {
  try {
    const captureResult = await capturePayment(req.body.id);
    res.status(200).json({ result: captureResult });
  } catch (error) {
    res.sendStatus(400);
  }
});

/**
 * @method POST
 * @route '/api/payment/token'
 * @returns payment token
 */
router.post('/token', async (req, res) => {
  try {
    const token = await newToken();
    res.status(200).json({ secret: token.secret });
  } catch (error) {
    res.sendStatus(403);
  }
});

module.exports = router;
