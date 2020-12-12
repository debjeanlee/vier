import React from 'react';
import PropTypes from 'prop-types';
import CategoryCard from './ui/CategoryCard';

function Categories({ openCategory, categoriesData }) {
  const categories = categoriesData.map((category) => (
    <CategoryCard categoryData={category} openCategory={openCategory} key={category.name} />
  ));

  return (
    <div className="home-page-div">
      <div className="category-main-div">{categories}</div>
    </div>
  );
}

Categories.propTypes = {
  openCategory: PropTypes.func,
  categoriesData: PropTypes.array,
};

export default Categories;
