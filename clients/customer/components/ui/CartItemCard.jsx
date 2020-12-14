import React from 'react';
import PropTypes from 'prop-types';

function CartItemCard({ cartItem }) {
  return (
    <div className="cart-item-card">
      <div className="cart-item-name-div">
        <h6>{cartItem.name}</h6>
      </div>
      <div className="cart-quantity-price-div">
        <div>x2</div>
        <p>${cartItem.price}</p>
      </div>
    </div>
  );
}

CartItemCard.propTypes = {
  cartItem: PropTypes.object,
};

export default CartItemCard;
