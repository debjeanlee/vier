const router = require('express').Router();
const { newToken } = require('../helpers/payment');

/**
 * @method POST
 * @route '/api/payment/token'
 * @returns payment token
 */
router.post('/token', async (req, res) => {
  const token = await newToken();
  res.json({ secret: token.secret });
});

module.exports = router;
