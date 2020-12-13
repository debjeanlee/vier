import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function FAIcon({ icon, iconClass, divClass, clickFunc }) {
  if (clickFunc) {
    return (
      <div className={divClass} onClick={clickFunc}>
        <FontAwesomeIcon icon={icon} className={iconClass} />
      </div>
    );
  }
  return (
    <div className={divClass}>
      <FontAwesomeIcon icon={icon} className={iconClass} />
    </div>
  );
}

FAIcon.propTypes = {
  icon: PropTypes.object,
  iconClass: PropTypes.string,
  divClass: PropTypes.string,
  clickFunc: PropTypes.func,
};

export default FAIcon;
