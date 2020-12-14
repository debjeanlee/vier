import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import FAIcon from '../../../shared/components/FAIcon';

function MenuItemCard({ menuItem, selectedMenuItem, setSelectedMenuItem, quantity, sessionId }) {
  function expandMenuItem(name) {
    if (selectedMenuItem === name) {
      setSelectedMenuItem('');
    } else {
      setSelectedMenuItem(name);
    }
  }

  // let cartIndex = cartData.

  async function incrementItem() {
    console.log('increase');
    try {
      const res = axios.patch(`/api/cart/increase/${sessionId}`, {
        dishId: menuItem._id,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  function decrementItem() {
    console.log('decrease');
  }

  return (
    <div
      className={
        menuItem.name === selectedMenuItem && menuItem.description !== ''
          ? 'menuitem-card expand'
          : 'menuitem-card'
      }
      key={menuItem.name}
    >
      <img src={menuItem.img} alt="" />
      <div
        className="menuitem-info"
        role="menuitem"
        // tabIndex={0}
        onKeyDown={() => expandMenuItem(menuItem.name)}
        onClick={() => expandMenuItem(menuItem.name)}
      >
        <div className="menuitem-title-description-div">
          <h4>{menuItem.name}</h4>
          <p style={menuItem.name === selectedMenuItem ? { opacity: `1` } : {}}>
            {menuItem.description}
          </p>
        </div>
        <div className="weight-price-div">
          <p>250g</p>
          <h6>
            ${menuItem.price}
            {menuItem.pricesuffix}
          </h6>
        </div>
      </div>
      <div className="menuitem-quantity-div">
        <FAIcon
          icon={faPlus}
          iconClass="fa-icon plus"
          divClass="fa-icon-div"
          clickFunc={incrementItem}
        />
        <div className="quantiy-count">
          <h6>{quantity}</h6>
        </div>
        <FAIcon
          icon={faMinus}
          iconClass="fa-icon minus"
          divClass="fa-icon-div"
          clickFunc={decrementItem}
        />
      </div>
    </div>
  );
}

MenuItemCard.propTypes = {
  menuItem: PropTypes.object,
  selectedMenuItem: PropTypes.string,
  setSelectedMenuItem: PropTypes.func,
  name: PropTypes.string,
  img: PropTypes.string,
  description: PropTypes.string,
  sessionId: PropTypes.string,
  quantity: PropTypes.number,
};

export default MenuItemCard;
