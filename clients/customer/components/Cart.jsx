import React, { useState, useRef } from 'react';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cartData } from '../data/testData';

function Cart({ session }) {
  const [cartPosition, setCartPosition] = useState('-60');
  const expandCart = useRef(false);

  function toggleExpandCart() {
    expandCart.current = !expandCart.current;
    if (expandCart.current === true) {
      setCartPosition('0');
    } else if (expandCart.current === false) {
      setCartPosition('-60');
    }
  }

  function calculateTotal(cart) {
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });
    return total;
  }

  const cartTotal = calculateTotal(cartData);

  const cartItems = cartData.map((item) => (
    <div className="cart-item-card">
      <h6>{item.name}</h6>
      <p>${item.price}</p>
    </div>
  ));

  return (
    <div className="cart-div" style={{ bottom: `${cartPosition}vh` }}>
      <div className="cart-header" onClick={() => toggleExpandCart()}>
        <h4>Shopping Cart</h4>
        <FontAwesomeIcon
          icon={faChevronUp}
          className="fa-arrow"
          style={expandCart.current === true ? { transform: 'rotate(180deg)' } : {}}
        />
      </div>
      <div className="cart-body">{cartItems}</div>
      <div className="cart-footer">
        <div>Place Order</div>
        <div> Total: ${cartTotal}</div>
      </div>
    </div>
  );
}

export default Cart;
