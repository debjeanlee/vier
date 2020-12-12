import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Categories from '../components/Categories';
import MenuItems from '../components/MenuItems';

function Home({ setBackdropWidth, setSelectedCategory, selectedCategory }) {
  const [categoriesData, setCategoriesData] = useState([]);
  const [categoryHeaderPos, setCategoryHeaderPos] = useState('100');

  async function getCategories() {
    try {
      const res = await axios.get('/api/categories');
      setCategoriesData(res.data.categories);
    } catch (err) {
      throw new Error(err);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  function openCategory(category) {
    setSelectedCategory(category);
    setBackdropWidth('70');
    setCategoryHeaderPos('15');
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  if (selectedCategory === '') {
    return <Categories openCategory={openCategory} categoriesData={categoriesData} />;
  }
  return <MenuItems selectedCategory={selectedCategory} categoryHeaderPos={categoryHeaderPos} />;
}

Home.propTypes = {
  setBackdropWidth: PropTypes.func,
  setSelectedCategory: PropTypes.func,
  selectedCategory: PropTypes.string,
};

export default Home;
