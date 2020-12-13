import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTasks } from '@fortawesome/free-solid-svg-icons';

function Topbar({ goHome }) {
  return (
    <div className="topbar">
      <div className="topbar-buttons-wrapper" role="button" onClick={goHome}>
        <FontAwesomeIcon icon={faHome} className="fa-home" />
      </div>
      <div className="topbar-buttons-wrapper">
        <FontAwesomeIcon icon={faTasks} className="fa-shopping" />
      </div>
    </div>
  );
}

Topbar.propTypes = {
  goHome: PropTypes.func,
};

export default Topbar;
