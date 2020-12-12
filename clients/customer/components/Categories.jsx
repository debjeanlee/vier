import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { categoryData } from '../data/testData';

function Categories({ openCategory }) {
  const categories = categoryData.map((category) => (
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
  ));

  return (
    <div className="home-page-div">
      <div className="category-main-div">{categories}</div>
    </div>
  );
}

export default Categories;
