import React, { useState, useEffect } from 'react';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { axiosGet } from '../../shared/helpers/api';
import OrderCard from './components/OrderCard';
import FAIcon from '../../shared/components/FAIcon';

function Dashboard() {
  const [orders, setOrders] = useState([]);

  async function getAllOrders() {
    const res = await axiosGet('/api/orders/active');
    const arr = [];
    res.orders.forEach((order) => {
      const obj = { orderId: order._id };
      order.items.forEach((item) => {
        if (item.progress === 'Confirmed' || item.progress === 'Preparing') {
          obj.item = item;
          arr.push(obj);
        }
      });
    });
    setOrders(arr);
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  console.log(orders);

  const orderCards = orders.map((el, i) => {
    if (el.item.progress === 'Confirmed' || el.item.progress === 'Preparing') {
      return <OrderCard item={el.item} key={i} orderId={el.orderId} getAllOrders={getAllOrders} />;
    }
  });

  return (
    <div className="kitchen-container">
      <div className="crew-title">
        <FAIcon icon={faTasks} divClass="icon" />
        <h1>Orders</h1>
      </div>
      <div className="flexbox">{orderCards}</div>
    </div>
  );
}

export default Dashboard;
