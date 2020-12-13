import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import FAIcon from '../../../shared/components/FAIcon';

function CategoryCard({ categoryData, openCategory }) {
  return (
    <div
      className="category-card"
      key={categoryData.name}
      onMouseUp={() => openCategory(categoryData.name)}
      role="menuitem"
    >
      <img src={categoryData.img_url} alt="" />
      <div className="category-info">
        <h2>{categoryData.name}</h2>
        <p>7 items</p>
      </div>
      <FAIcon icon={faChevronRight} iconClass="fa-arrow" divClass="arrow-div" />
    </div>
  );
}

CategoryCard.propTypes = {
  categoryData: PropTypes.object,
  openCategory: PropTypes.func,
};

export default CategoryCard;
