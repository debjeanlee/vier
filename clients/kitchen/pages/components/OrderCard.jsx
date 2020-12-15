import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { axiosPatch } from '../../../shared/helpers/api'

function OrderCard({ item, orderId, getAllOrders }) {
  const [status, setStatus] = useState({ state: '', button: '', class: '' });

  async function updateProgress() {
    const res = await axiosPatch(`/api/orders/items/${orderId}`, {
      itemId: item._id,
    });
    getAllOrders();
  }

  function setProgress() {
    if (item.progress === 2) {
      setStatus({
        state: 'Pending..',
        button: 'START',
        class: 'pink',
      })
    } else {
      setStatus({
        state: 'In-Progress..',
        button: 'COMPLETE',
        class: 'green',
      })
    }
  }

  useEffect(() => {
    setProgress();
  }, []);

  return (
    <div className="sm-container">
      <div className="flexbox">
        <h3>{item.dish.name}</h3>
        <h3 className="pill">x{item.quantity}</h3>
      </div>
      <div className="flexbox btn-container">
        <button className={status.class} onClick={updateProgress}>{status.button}</button>
        <div className="sm-container">
          <p>Status: {status.state}</p>
        </div>
      </div>
    </div>
  );
}

OrderCard.propTypes = {
  item: PropTypes.object,
  orderId: PropTypes.string,
  getAllOrders: PropTypes.func,
};

export default OrderCard;
