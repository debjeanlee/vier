import React from 'react';
import { useLocation } from 'react-router-dom';

function Checkout() {
  const { state } = useLocation();
  return (
    <div>
      <h3>Checkout</h3>
      <div>Total amount payable: {state.total}</div>
      <button>Request Payment</button>
    </div>
  );
}

export default Checkout;
