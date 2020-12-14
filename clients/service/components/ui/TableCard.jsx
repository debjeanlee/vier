import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { axiosPatch, axiosPost } from '../../../shared/helpers/api';

function TableCard({ tableData, getRestaurantData }) {
  async function createSession() {
    await axiosPost('/api/session/new', {
      tableNo: tableData.tableNo,
    });
    getRestaurantData();
  }

  async function endSession() {
    await axiosPatch(`/api/session/${tableData.tableNo}`);
    getRestaurantData();
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
