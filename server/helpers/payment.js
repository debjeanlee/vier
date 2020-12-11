const stripe = require('stripe')(process.env.STRIPE_SK);

const newToken = () => stripe.terminal.connectionTokens.create();

module.exports = {
  newToken,
};
