import React, { useState, useEffect } from 'react';
import { axiosGet } from '../../shared/helpers/api';
import OrderCard from './components/OrderCard';

function Dashboard() {
  const [orders, setOrders] = useState([]);

  async function getAllOrders() {
    const res = await axiosGet('/api/orders/active');
    const arr = [];
    res.orders.forEach((el) => {
      el.items.forEach((item) => {
        if (item.progress === 2) {
          arr.push(item);
        }
      });
    });
    setOrders(arr);
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div>
      <h1>Order Up!</h1>
      <div className="flex-container">
        {orders.map((el, i) => (
          <OrderCard item={el} key={i} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
