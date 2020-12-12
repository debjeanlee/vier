import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import { dishesData } from '../data/testData';
import DishCard from './ui/DishCard';

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
    <DishCard dish={dish} expandDish={expandDish} selectedDish={selectedDish} />
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
