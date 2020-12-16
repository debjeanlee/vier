import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import OrderItemCard from './components/ui/OrderItemCard';

function Orders({ sessionData }) {
  const orders = sessionData.orders.map((el, i) => <OrderItemCard order={el} number={i} key={i} />);
  const [total, setTotal] = useState(0);

  function getTotalCost() {
    const reducer = (total, cur) => total + cur;
    const count = sessionData.orders.map((el) => el.totalCost).reduce(reducer);
    setTotal(count.toFixed(2));
  }

  useEffect(() => {
    getTotalCost();
  }, []);

  return (
    <div className="home-page-div">
      <div className="category-header-div">
        <h3>Orders</h3>
        <h4 className="total">Total: ${total}</h4>
      </div>
      <div className="order-item-container">
        {orders}
        <Link className="route-link" to={{ pathname: '/checkout', state: { total } }}>
          <div className="card">
            <h3>Checkout</h3>
          </div>
        </Link>
      </div>
    </div>
  );
}

Orders.propTypes = {
  sessionData: PropTypes.object,
};

export default Orders;
