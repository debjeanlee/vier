import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

function OrderItemCard({ order, number }) {
  const [open, setOpen] = useState(false);
  const [progressBar, setProgressBar] = useState();

  const orderDetails = order.items.map((el) => (
    <div className="cart-item-card" key={el._id}>
      <div className="cart-item-name-div">
        <h6>{el.dish.name}</h6>
      </div>
      <div className="cart-quantity-price-div">
        <p>x{el.quantity}</p>
        <p>${el.dish.price * el.quantity}</p>
      </div>
    </div>
  ));

  function toggleOpen() {
    setOpen(!open);
  }

  function getProgress() {
    if (order.status === 'Requested') {
      setProgressBar(<div className="progress-bar2" />);
    } else if (order.status === 'Confirmed') {
      setProgressBar(<div className="progress-bar2" style={{ width: '35%' }} />)
    } else if (order.status === 'Preparing') {
      setProgressBar(<div className="progress-bar2" style={{ width: '65%' }} />)
    } else if (order.status === 'Completed') {
      setProgressBar(<div className="progress-bar2" style={{ width: '100%' }} />)
    }
  }

  useEffect(() => {
    getProgress();
  }, []);

  return (
    <div className={open ? 'card expand' : 'card'}>
      <div className="card-header" onClick={() => toggleOpen()}>
        <h4>Order #{number + 1}</h4>
        <FontAwesomeIcon icon={faChevronDown} className={open ? 'fa-arrow expand' : 'fa-arrow'} />
      </div>
      <div>
        <p>Status: {order.status}</p>
        <div className="progress2 progress-moved">{progressBar}</div>
        {open ? <div className="order-details-container">{orderDetails}</div> : ''}
      </div>
    </div>
  );
}

OrderItemCard.propTypes = {
  order: PropTypes.object,
  number: PropTypes.number,
};

export default OrderItemCard;
