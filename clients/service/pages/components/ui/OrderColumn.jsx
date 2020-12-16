import React from 'react';
import PropTypes from 'prop-types';
import { axiosPatch } from '../../../../shared/helpers/api';
import OrderItemCard from './OrderItemCard';

function OrderColumn({ orderData }) {
  async function confirmOrder() {
    await axiosPatch(`/api/orders/confirm/${orderData._id}`);
  }

  const orderItems = orderData.items.map((itemData) => <OrderItemCard itemData={itemData} />);

  return (
    <div className="order-column">
      <h4>Order no: {orderData.orderNo}</h4>
      <p>status: {orderData.completed ? 'Completed' : 'On Request'}</p>
      {orderItems}
      <button type="button" onClick={confirmOrder}>
        Confirm order
      </button>
    </div>
  );
}

OrderColumn.propTypes = {
  orderData: PropTypes.object,
};

export default OrderColumn;
