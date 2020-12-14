import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import OrderItemCard from '../components/ui/OrderItemCard';

function Orders({ sessionData }) {
  const orders = sessionData.orders.map((el, i) => <OrderItemCard order={el} number={i} key={i} />);
  const [total, setTotal] = useState(0);

  function getTotalCost() {
    let count = 0;
    sessionData.orders.forEach((el) => {
      count += el.totalCost;
    });
    setTotal(count.toFixed(2));
  }

  useEffect(() => {
    getTotalCost();
  }, []);

  return (
    <div className="home-page-div">
      <div className="category-header-div">
        <h3>Orders</h3>
        <h5 className="total">Total: ${total}</h5>
      </div>
      <div className="order-item-container">{orders}</div>
    </div>
  );
}

Orders.propTypes = {
  sessionData: PropTypes.object,
};

export default Orders;
