import React from 'react';
import PropTypes from 'prop-types';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import FAIcon from '../../../../shared/components/FAIcon';

function CategoryCard({ categoryData, openCategory }) {
  return (
    <div
      className="category-card"
      key={categoryData.category}
      onMouseUp={() => openCategory(categoryData.category)}
      role="menuitem"
    >
      <img src={categoryData.items[0].img} alt="" />
      <div className="category-info">
        <h2>{categoryData.category}</h2>
        <p>{categoryData.items.length} items</p>
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
