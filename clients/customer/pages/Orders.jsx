import React from 'react';
import PropTypes from 'prop-types';
import OrderItemCard from '../components/ui/OrderItemCard';

function Orders({ sessionData }) {
  const orders = sessionData.session.orders.map((el, i) => <OrderItemCard order={el} number={i} />);

  return (
    <div className="home-page-div">
      <div className="category-header-div">
        <h3>Orders</h3>
      </div>
      <div className="order-item-container">{orders}</div>
    </div>
  );
}

Orders.propTypes = {
  sessionData: PropTypes.object,
};

export default Orders;
