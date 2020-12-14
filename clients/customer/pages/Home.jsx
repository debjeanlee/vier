import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Categories from '../components/Categories';
import MenuItems from '../components/MenuItems';
import Orders from './Orders';

function Home({ pageMode, setPageMode, getSessionData, sessionData }) {
  const [menuData, setMenuData] = useState([]);
  const [categoryHeaderPos, setCategoryHeaderPos] = useState('100');
  const { tableno } = useParams();

  async function getMenu() {
    try {
      const res = await axios.get('/api/dishes');
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
    getSessionData(tableno);
  }, []);

  if (pageMode.mode === 'menuitems') {
    return (
      <MenuItems pageMode={pageMode} menuData={menuData} categoryHeaderPos={categoryHeaderPos} />
    );
  }
  if (pageMode.mode === 'orders') {
    return <Orders sessionData={sessionData} />;
  }
  return <Categories openCategory={openCategory} menuData={menuData} />;
}

Home.propTypes = {
  setPageMode: PropTypes.func,
  pageMode: PropTypes.object,
  getSessionData: PropTypes.func,
  sessionData: PropTypes.object,
};

export default Home;
