import React from 'react';
import PropTypes from 'prop-types';
import { faHome, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import FAIcon from '../../../shared/components/FAIcon';

function Topbar({ goHome, goOrders }) {
  return (
    <div className="topbar">
      <FAIcon
        icon={faHome}
        iconClass="fa-home"
        divClass="topbar-buttons-wrapper"
        clickFunc={goHome}
      />
      <FAIcon icon={faShoppingBasket} iconClass="fa-shopping" divClass="topbar-buttons-wrapper" />
    </div>
  );
}

Topbar.propTypes = {
  goHome: PropTypes.func,
};

export default Topbar;
