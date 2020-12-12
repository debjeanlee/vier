import { loadStripeTerminal } from '@stripe/terminal-js';
import { axiosPost } from '../helpers/api';

const createTerminal = async () => {
  const StripeTerminal = await loadStripeTerminal();

  return StripeTerminal.create({
    onFetchConnectionToken: async () => {
      const res = await axiosPost(`${process.env.PAYMENT}/token`);
      return res.secret;
    },
    onUnexpectedReaderDisconnect: async (error) => {
      throw new Error(error);
    },
  });
};

const connectTerminal = async () => {
  const config = { simulated: true };
  const terminal = await createTerminal();
  const discoverResult = await terminal.discoverReaders(config);

  if (discoverResult.error) {
    throw new Error(`Failed to discover: ${discoverResult.error}`);
  } else if (discoverResult.discoveredReaders.length === 0) {
    throw new Error('No available readers.');
  } else {
    // Select first reader
    const selectedReader = discoverResult.discoveredReaders[0];
    // Connect reader
    const connectResult = await terminal.connectReader(selectedReader);

    if (connectResult.error) {
      throw new Error(`Failed to connect: ${connectResult.error}`);
    } else {
      return terminal;
    }
  }
};

export default connectTerminal;
