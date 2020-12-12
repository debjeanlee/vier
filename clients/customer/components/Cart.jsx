import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { cartData } from '../data/testData';
import { calculateTotal } from '../../shared/helpers/func';
import CartItemCard from './ui/CartItemCard';

function Cart({ sessionData }) {
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

  const cartTotal = calculateTotal(cartData);

  const cartItems = cartData.map((item) => <CartItemCard cartItem={item} key={item.name} />);

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

Cart.propTypes = {
  sessionData: PropTypes.func,
};

export default Cart;
