import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const categoryData = [
    {
      name: 'Starters',
    },
    {
      name: 'Steak',
    },
    {
      name: 'Combo',
    },
    {
      name: 'Seafood',
    },
    {
      name: 'Beverages',
    },
  ];

  const categories = categoryData.map((category) => (
    <div className="category-card">
      <div className="category-info">
        <div className="image-div" />
        <h2>{category.name}</h2>
        <p>7 items</p>
      </div>
      <div className="arrow-div">
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </div>
  ));

  return (
    <div className="home-page-div">
      <div className="categories-main-div">{categories}</div>
    </div>
  );
}

export default Home;
