import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { calculateTotal } from '../../shared/helpers/func';
import CartItemCard from './ui/CartItemCard';

function Cart({ cartData, sessionId, getSessionData }) {
  const [expandCart, setExpandCart] = useState(false);
  const { tableno } = useParams();

  function toggleExpandCart() {
    setExpandCart(!expandCart);
  }

  let cartItems = '';
  let cartTotal = 0;
  if (cartData) {
    cartTotal = calculateTotal(cartData);
    cartItems = cartData.map((item) => <CartItemCard cartItem={item} key={item.dish.name} />);
  }

  async function placeOrder() {
    try {
      const res = await axios.patch(`/api/orders/new/${sessionId}`);
      getSessionData(tableno);
    } catch (err) {
      console.log(err);
    }
  }

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
        <div className="order-button-div" onClick={placeOrder}>
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
  cartData: PropTypes.array,
  sessionId: PropTypes.string,
  getSessionData: PropTypes.func,
};

export default Cart;
