const stripe = require('stripe')(process.env.STRIPE_SK);

const newToken = async () => {
  try {
    const token = await stripe.terminal.connectionTokens.create();
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

const capturePayment = async (paymentID) => {
  try {
    const res = await stripe.paymentIntents.capture(paymentID);
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

const initiatePayment = async (amount) => {
  try {
    const intent = await stripe.paymentIntents.create({
      amount,
      currency: 'sgd',
      payment_method_types: ['card_present'],
      capture_method: 'manual',
    });

    return intent;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  newToken,
  initiatePayment,
  capturePayment,
};
