import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { categoryData } from '../data/testData';
import CategoryCard from './ui/CategoryCard';

function Categories({ openCategory }) {
  const categories = categoryData.map((category) => (
    <CategoryCard category={category} openCategory={openCategory} key={category.name} />
  ));

  return (
    <div className="home-page-div">
      <div className="category-main-div">{categories}</div>
    </div>
  );
}

export default Categories;
