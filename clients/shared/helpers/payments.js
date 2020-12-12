import { axiosGet, axiosPost } from './api';
import cards from '../verifone/cards.sim';
import connectTerminal from '../verifone/terminal.sim';

const processPayment = async (terminal, paymentIntent) => {
  const result = await terminal.processPayment(paymentIntent);
  if (result.error) throw new Error(`Unable to process payment: ${result.error}`);

  try {
    const { id } = result.paymentIntent;
    const processingResult = await axiosPost(`${process.env.PAYMENT}/capture`, { id });
    // payment successful
  } catch (error) {
    // payment unsuccessful
  }
};

const initiatePayment = async (amount, cardType) => {
  try {
    const newPayment = await axiosGet(`${process.env.PAYMENT}/new/?amount=${amount}`);
    const terminal = connectTerminal();

    // set test configs
    terminal.setSimulatorConfiguration({ testCardNumber: cards(cardType) });

    const result = await terminal.collectPaymentMethod(newPayment.intent.client_secret);
    processPayment(terminal, result.paymentIntent);
  } catch (error) {
    throw new Error('Unable to initialize payment.');
  }
};

export default initiatePayment;
