const stripe = require('stripe')(process.env.STRIPE_SK);

const newToken = () => stripe.terminal.connectionTokens.create();

const capturePayment = async (paymentID) => stripe.paymentIntents.capture(paymentID);

const initiatePayment = async (amount) => {
  const intent = await stripe.paymentIntents.create({
    amount,
    currency: 'sgd',
    payment_method_types: ['card_present'],
    capture_method: 'manual',
  });

  return intent;
};

module.exports = {
  newToken,
  initiatePayment,
  capturePayment,
};
