import React from 'react';
import PropTypes from 'prop-types';

function CartItemCard({ cartItem }) {
  return (
    <div className="cart-item-card">
      <h6>{cartItem.name}</h6>
      <p>${cartItem.price}</p>
    </div>
  );
}

CartItemCard.propTypes = {
  cartItem: PropTypes.object,
};

export default CartItemCard;
