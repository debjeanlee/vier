import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function TableCard({ tableData, getRestaurantData }) {
  console.log('tableData', tableData);

  async function createSession() {
    try {
      await axios.post('/api/session/new', {
        tableNo: tableData.tableNo,
      });
      getRestaurantData();
    } catch (err) {
      console.log(err);
    }
  }

  async function endSession() {
    try {
      await axios.patch(`/api/session/${tableData.tableNo}`);
      getRestaurantData();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="table-card">
      <h3>Table: {tableData.tableNo}</h3>
      {tableData.session ? <p>Session: {tableData.session.session}</p> : ''}
      {tableData.session && tableData.session.orders ? (
        <p>
          Completed Orders:{' '}
          {tableData.session.orders.filter((order) => order.completed === true).length}
        </p>
      ) : (
        ''
      )}
      {tableData.session && tableData.session.orders ? (
        <p>
          Open Orders:{' '}
          {tableData.session.orders.filter((order) => order.completed === false).length}
        </p>
      ) : (
        ''
      )}
      <button>Expand</button>
      <button onClick={() => createSession()}>Create Session</button>
      <button onClick={() => endSession()}>End Session</button>
    </div>
  );
}

TableCard.propTypes = {
  tableData: PropTypes.object,
  getRestaurantData: PropTypes.func,
};

export default TableCard;
