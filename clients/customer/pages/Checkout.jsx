import React from 'react';
import { useLocation } from 'react-router-dom';
import socket from '../../shared/helpers/socket';

function Checkout() {
  const { state } = useLocation();

  function clickHandler() {
    socket.transmit('checkout');
  }

  return (
    <div>
      <h3>Checkout</h3>
      <div>Total amount payable: {state.total}</div>
      <button onClick={clickHandler}>Request Payment</button>
    </div>
  );
}

export default Checkout;
