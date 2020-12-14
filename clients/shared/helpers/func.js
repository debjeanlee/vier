function calculateTotal(cart) {
  let total = 0;
  cart.forEach((item) => {
    total += item.dish.price * item.quantity;
  });
  return total;
}

export { calculateTotal }