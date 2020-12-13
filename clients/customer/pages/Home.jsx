import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Categories from '../components/Categories';
import MenuItems from '../components/MenuItems';
import Orders from './Orders';

function Home({ setBackdropWidth, setPageMode, pageMode }) {
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

  function openCategory(category) {
    setPageMode({ mode: 'menuitems', category });
    setCategoryHeaderPos('15');
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  useEffect(() => {
    getCategories();
  }, []);

  if (pageMode.mode === 'menuitems') {
    return <MenuItems pageMode={pageMode} categoryHeaderPos={categoryHeaderPos} />;
  }
  if (pageMode.mode === 'orders') {
    return <Orders />;
  }
  return <Categories openCategory={openCategory} categoriesData={categoriesData} />;
}

Home.propTypes = {
  setBackdropWidth: PropTypes.func,
  setPageMode: PropTypes.func,
  pageMode: PropTypes.object,
};

export default Home;
