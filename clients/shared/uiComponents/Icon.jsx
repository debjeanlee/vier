import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Icon({ wrapClass, icon, iconClass }) {
  return (
    <div className={wrapClass}>
      <FontAwesomeIcon icon={icon} className={iconClass} />
    </div>
  );
}

Icon.propTypes = {
  wrapClass: PropTypes.string,
  icon: PropTypes.string,
  iconClass: PropTypes.string,
};

export default Icon;
