import React from 'react';
import OrderItemCard from '../components/ui/OrderItemCard';

function Orders({ sessionData }) {
  const orders = sessionData.session.orders.map(el => (
    <OrderItemCard />
  ))

  return (
    <div className="home-page-div">
      <div className="category-header-div">
        <h3>Orders</h3>
      </div>
      <div className="orders-main-div">{orders}</div>
    </div>
  );
}

export default Orders;