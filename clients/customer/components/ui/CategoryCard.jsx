import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

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
      <div className="arrow-div">
        <FontAwesomeIcon icon={faChevronRight} className="fa-arrow" />
      </div>
    </div>
  );
}

CategoryCard.propTypes = {
  categoryData: PropTypes.object,
  openCategory: PropTypes.func,
};

export default CategoryCard;
