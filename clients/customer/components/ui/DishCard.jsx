import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";

function DishCard({dish, expandDish, selectedDish}) {
  return (
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
  );
}

export default DishCard;