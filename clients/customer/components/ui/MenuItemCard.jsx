import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

function MenuItemCard({ menuItem, selectedMenuItem, setSelectedMenuItem }) {
  function expandMenuItem(name) {
    if (selectedMenuItem === name) {
      setSelectedMenuItem('');
    } else {
      setSelectedMenuItem(name);
    }
  }

  return (
    <div
      className="menuitem-card"
      key={menuItem.name}
      style={menuItem.name === selectedMenuItem ? { height: `240px` } : {}}
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
          {menuItem.name === selectedMenuItem ? <p>{menuItem.description}</p> : ''}
        </div>
        <div className="weight-price-div">
          <p>250g</p>
          <h6>${menuItem.price}</h6>
        </div>
      </div>
      <div className="menuitem-quantity-div">
        <div className="fa-icon-div">
          <FontAwesomeIcon icon={faPlus} className="fa-icon plus" />
        </div>
        <div className="quantiy-count">
          <h6>5</h6>
        </div>
        <div className="fa-icon-div">
          <FontAwesomeIcon icon={faMinus} className="fa-icon minus" />
        </div>
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
};

export default MenuItemCard;
