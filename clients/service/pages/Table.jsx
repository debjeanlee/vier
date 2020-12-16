import React from 'react';
import PropTypes from 'prop-types';
import OrderColumn from './components/ui/OrderColumn';

function Table({ tableData }) {
  const { session } = tableData.session;

  const ordersRender = tableData.session.orders.map((orderData) => (
    <OrderColumn orderData={orderData} sessionID={session} />
  ));

  return (
    <div className="table-page">
      <h3>Table {tableData.tableNo}</h3>
      <div className="orders-container">{ordersRender}</div>
    </div>
  );
}

Table.propTypes = {
  tableData: PropTypes.object,
};

export default Table;
