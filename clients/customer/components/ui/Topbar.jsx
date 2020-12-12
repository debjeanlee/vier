import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faShoppingBasket} from "@fortawesome/free-solid-svg-icons";

function Topbar({goHome}) {
  return (
    <div className="topbar">
          <div className="topbar-buttons-wrapper" onClick={goHome}>
            <FontAwesomeIcon icon={faHome} className="fa-home" />
          </div>
          <div className="topbar-buttons-wrapper">
            <FontAwesomeIcon icon={faShoppingBasket} className="fa-shopping" />
          </div>
        </div>
  );
}

export default Topbar;