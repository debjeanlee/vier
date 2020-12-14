import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

function OrderItemCard({ order, number }) {
  const [open, setOpen] = useState(false);

  const orderDetails = order.items.map((el) => (
    <div className="cart-item-card" key={el._id}>
      <div className="cart-item-name-div">
        <h6>{el.dish.name}</h6>
      </div>
      <div className="cart-quantity-price-div">
        <div>x{el.quantity}</div>
        <p>${el.dish.price * el.quantity}</p>
      </div>
    </div>
  ));

  function toggleOpen() {
    setOpen(!open);
  }

  return (
    <div className={open === true ? 'card expand' : 'card'}>
      <div className="card-header" onClick={() => toggleOpen()}>
        <h4>Order #{number + 1}</h4>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={open === true ? 'fa-arrow expand' : 'fa-arrow'}
        />
      </div>
      <div>
        <p>Status: * change order schema? *</p>
        <div className="progress2 progress-moved">
          <div className="progress-bar2" />
        </div>
        <div>{open ? orderDetails : ''}</div>
      </div>
    </div>
  );
}

OrderItemCard.propTypes = {
  order: PropTypes.object,
  number: PropTypes.number,
};

export default OrderItemCard;
