import React from 'react';
import PropTypes from 'prop-types';

function OrderCard({ item }) {

// ROUTE TO UPDATE ITEM PROGRESS, UPDATES ORDER STATUS IF ALL ITEMS COMPLETE
//  * @method PATCH
//  * @route '/api/orders/:orderId'
//  * @params orderId to find order
//  * @body takes itemId in body to find item

  return (
    <div className="card">
      <h3>{item.dish.name}</h3>
      <h3 className="qty">x{item.quantity}</h3>
      <div>update button here</div>
    </div>
  );
}

OrderCard.propTypes = {
  item: PropTypes.object,
}

export default OrderCard;
