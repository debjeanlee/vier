import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import { dishesData } from '../data/testData';

function Dishes({ selectedCategory, categoryHeaderPos }) {
  const [selectedDish, setSelectedDish] = useState('');

  function expandDish(name) {
    if (selectedDish === name) {
      setSelectedDish('');
    } else {
      setSelectedDish(name);
    }
  }

  const dishes = dishesData.map((dish) => (
    <div
      className="dish-card"
      key={dish.name}
      style={dish.name === selectedDish ? { height: `240px` } : {}}
    >
      <img src={dish.img_url} alt="" />
      <div className="dish-info" onClick={() => expandDish(dish.name)}>
        <div className="dish-title-description-div">
          <h4>{dish.name}</h4>
          {dish.name === selectedDish ? <p>{dish.description}</p> : ''}
        </div>
        <div className="weight-price-div">
          <p>250g</p>
          <h6>${dish.price}</h6>
        </div>
      </div>
      <div className="dish-quantity-div">
        <div className="fa-icon-div">
          <FontAwesomeIcon icon={faPlus} className="fa-icon plus" />
        </div>
        <div className="quantiy-count">
          <h6>5</h6>
        </div>
        <div className="fa-icon-div">
          <FontAwesomeIcon icon={faMinus} className="fa-icon minus" />
        </div>
      </div>
    </div>
  ));

  return (
    <div className="home-page-div">
      <div className="category-header-div" style={{ left: `${categoryHeaderPos}vw` }}>
        <h3>{selectedCategory} </h3>
        <h3>menu</h3>
      </div>
      <div className="dishes-main-div">{dishes}</div>
    </div>
  );
}

export default Dishes;
