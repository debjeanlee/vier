import React from 'react';

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
  ];

  const categories = categoryData.map((category) => (
    <div className="category-card">
      <div className="category-info">
        <h2>{category.name}</h2>
        <p>7 items</p>
      </div>
      <div className="arrow-div"></div>
    </div>
  ));

  return (
    <div className="home-page-div">
      <div className="categories-main-div">{categories}</div>
    </div>
  );
}

export default Home;
