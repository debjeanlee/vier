import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Categories from './components/Categories';
import MenuItems from './components/MenuItems';
import Orders from './Orders';
import { axiosGet } from '../../shared/helpers/api';

function Home({ pageMode, setPageMode, getSessionData, sessionData, cartData }) {
  const [menuData, setMenuData] = useState([]);
  const [categoryHeaderPos, setCategoryHeaderPos] = useState('100');
  const { tableno } = useParams();

  async function getMenu() {
    const res = await axiosGet('/api/dishes');
    setMenuData(res.menuItems);
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
      <MenuItems
        pageMode={pageMode}
        menuData={menuData}
        categoryHeaderPos={categoryHeaderPos}
        cartData={cartData}
        sessionId={sessionData._id}
        getSessionData={getSessionData}
      />
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
  cartData: PropTypes.array,
  _id: PropTypes.string,
  sessionData: PropTypes.object,
};

export default Home;
