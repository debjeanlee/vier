import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { cartData } from '../data/testData';
import { calculateTotal } from '../../shared/helpers/func';
import CartItemCard from './ui/CartItemCard';

function Cart({ sessionData }) {
  const [expandCart, setExpandCart] = useState(false);

  function toggleExpandCart() {
    setExpandCart(!expandCart);
  }

  const cartTotal = calculateTotal(cartData);

  const cartItems = cartData.map((item) => <CartItemCard cartItem={item} key={item.name} />);

  return (
    <div className={expandCart === true ? 'cart-div expand' : 'cart-div'}>
      <div className="cart-header" onClick={() => toggleExpandCart()}>
        <h4>Shopping Cart</h4>
        <FontAwesomeIcon
          icon={faChevronUp}
          className={expandCart === true ? 'fa-arrow expand' : 'fa-arrow'}
        />
      </div>
      <div className="cart-body">{cartItems}</div>
      <div className="cart-footer">
        <div className="order-button-div">
          <h5>Place Order</h5>
        </div>
        <div className="cart-total-text-div">
          <p>Total: </p> <h5>${cartTotal}</h5>
        </div>
      </div>
    </div>
  );
}

Cart.propTypes = {
  sessionData: PropTypes.func,
};

export default Cart;
