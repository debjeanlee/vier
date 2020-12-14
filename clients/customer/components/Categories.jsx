import React from 'react';
import PropTypes from 'prop-types';
import CategoryCard from './ui/CategoryCard';

function Categories({ openCategory, menuData }) {
  const categories = menuData.map((categoryData) => (
    <CategoryCard categoryData={categoryData} openCategory={openCategory} key={categoryData.category} />
  ));

  return (
    <div className="home-page-div">
      <div className="category-main-div">{categories}</div>
    </div>
  );
}

Categories.propTypes = {
  openCategory: PropTypes.func,
  menuData: PropTypes.array,
};

export default Categories;
