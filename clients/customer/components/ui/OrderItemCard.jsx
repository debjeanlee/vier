import React from 'react';
import PropTypes from 'prop-types';

function OrderItemCard({ order, number }) {
  return (
    <div className="card">
      <div className="card-header">
        <h4>Order #{number + 1}</h4>
      </div>
      <div>
        <p>Status: * change order schema? *</p>
        <div className="progress2 progress-moved">
          <div className="progress-bar2" />
        </div>
      </div>
    </div>
  );
}

OrderItemCard.propTypes = {
  order: PropTypes.object,
  number: PropTypes.number,
};

export default OrderItemCard;
