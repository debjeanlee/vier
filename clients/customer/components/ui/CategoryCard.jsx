import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";

function CategoryCard( { category, openCategory }) {
  return (
    <div
      className="category-card"
      key={category.name}
      onMouseUp={() => openCategory(category.name)}
    >
      <img src={category.img_url} alt="" />
      <div className="category-info">
        <h2>{category.name}</h2>
        <p>7 items</p>
      </div>
      <div className="arrow-div">
        <FontAwesomeIcon icon={faChevronRight} className="fa-arrow" />
      </div>
    </div>
  );
}

export default CategoryCard;