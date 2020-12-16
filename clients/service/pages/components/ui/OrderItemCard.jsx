import React from 'react';
import PropTypes from 'prop-types';

function OrderItemCard({ itemData }) {
  return (
    <div className="order-item-card">
      <p>{itemData.dish.name}</p>
      <p>quantity: {itemData.quantity}</p>
      <p>status: {itemData.progress}</p>
    </div>
  );
}

OrderItemCard.propTypes = {
  itemData: PropTypes.object,
};

export default OrderItemCard;
