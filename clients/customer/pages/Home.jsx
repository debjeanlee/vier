import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Categories from '../components/Categories';
import Dishes from '../components/Dishes';

function Home({setBackdropWidth, setSelectedCategory, selectedCategory}) {
  const [categoriesData, setCategoriesData] = useState({});
  const [categoryHeaderPos, setCategoryHeaderPos] = useState('100');

  //   async function getCategories() {
  //     try {
  //       const res = await axios.get('https://localhost:3000/api/categories');
  //       setCategoriesData(res.data);
  //       console.log('data', categoriesData);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   getCategories();

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
    return <Categories openCategory={openCategory} />;
  }
  return <Dishes selectedCategory={selectedCategory} categoryHeaderPos={categoryHeaderPos} />;
}

export default Home;
