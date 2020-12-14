import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableCard from '../components/ui/TableCard';

function Dashboard() {
  const [restaurantData, setRestaurantData] = useState([]);

  async function getRestaurantData() {
    try {
      const res = await axios.get('/api/tables');
      setRestaurantData(res.data.tables);
    } catch (err) {
      console.log(err);
    }
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
