import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axiosGet from 'axios';
import Categories from '../components/Categories';
import MenuItems from '../components/MenuItems';
import Orders from './Orders';

function Home({ pageMode, setPageMode }) {
  const [menuData, setMenuData] = useState([]);
  const [categoryHeaderPos, setCategoryHeaderPos] = useState('100');

  async function getMenu() {
    try {
      // const res = await axios.get('/api/categories');
      // setCategoriesData(res.data.categories);
      const res = await axiosGet('/api/dishes');
      console.log('res', res.data.menuItems);
      setMenuData(res.data.menuItems);
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
    getMenu();
  }, []);

  if (pageMode.mode === 'menuitems') {
    return (
      <MenuItems pageMode={pageMode} menuData={menuData} categoryHeaderPos={categoryHeaderPos} />
    );
  }
  if (pageMode.mode === 'orders') {
    return <Orders />;
  }
  return <Categories openCategory={openCategory} menuData={menuData} />;
}

Home.propTypes = {
  setPageMode: PropTypes.func,
  pageMode: PropTypes.object,
};

export default Home;
