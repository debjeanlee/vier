const cards = (type) => {
  switch (type) {
    case 'visa':
      return '4242424242424242';
    case 'mastercard':
      return '5555555555554444';
    case 'amex':
      return '378282246310005';
    case 'diners':
      return '3056930009020004';
    // default - payment declined
    default:
      return '4000000000000002';
  }
};

export default cards;
