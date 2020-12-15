import React from 'react';
import PropTypes from 'prop-types';
import { axiosPatch, axiosPost } from '../../../../shared/helpers/api';

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

  if (tableData.session) {
    return (
      <div className="table-card">
        <div className="table-header">
          <h3>Table {tableData.tableNo}</h3>
        </div>
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
        {/* <button>Expand</button> */}
        <button onClick={() => endSession()}>End Session</button>
      </div>
    );
  }
  return (
    <div className="table-card">
      <div className="table-header">
        <h3>Table {tableData.tableNo}</h3>
      </div>
      <div className="table-body no-session">
        <button onClick={() => createSession()}>Create Session</button>
      </div>
    </div>
  );
}

TableCard.propTypes = {
  tableData: PropTypes.object,
  getRestaurantData: PropTypes.func,
};

export default TableCard;
