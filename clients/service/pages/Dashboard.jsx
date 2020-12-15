import React, { useEffect, useState } from 'react';
import { axiosGet } from '../../shared/helpers/api';
import TableCard from '../components/ui/TableCard';

function Dashboard() {
  const [restaurantData, setRestaurantData] = useState([]);

  async function getRestaurantData() {
    const res = await axiosGet('/api/tables');
    setRestaurantData(res.tables);
  }

  let tables = '';
  if (restaurantData) {
    tables = restaurantData.map((tableData) => (
      <TableCard tableData={tableData} key={tableData._id} getRestaurantData={getRestaurantData} />
    ));
  }

  useEffect(() => {
    getRestaurantData();
  }, []);

  return <div className="tables-container">{tables}</div>;
}

export default Dashboard;
