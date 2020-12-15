import React, { useEffect, useState } from 'react';
import { axiosGet } from '../../shared/helpers/api';
import socket from '../../shared/helpers/socket';
import TableCard from '../components/ui/TableCard';

function Dashboard() {
  const [restaurantData, setRestaurantData] = useState([]);
  let tables = '';

  async function getRestaurantData() {
    const res = await axiosGet('/api/tables');
    setRestaurantData(res.tables);
  }

  function receiveOrder() {
    return socket.receive('order', () => {
      getRestaurantData();
    });
  }

  if (restaurantData) {
    tables = restaurantData.map((tableData) => (
      <TableCard tableData={tableData} key={tableData._id} getRestaurantData={getRestaurantData} />
    ));
  }

  useEffect(() => {
    getRestaurantData();
    receiveOrder();
  }, []);

  return <div className="tables-container">{tables}</div>;
}

export default Dashboard;
