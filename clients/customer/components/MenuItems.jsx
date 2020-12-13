import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { axiosGet } from '../../shared/helpers/api';
import MenuItemCard from './ui/MenuItemCard';


function MenuItems({ pageMode, categoryHeaderPos }) {
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const [menuItemsData, setMenuItemsData] = useState([]);

  function expandMenuItem(name) {
    if (selectedMenuItem === name) {
      setSelectedMenuItem('');
    } else {
      setSelectedMenuItem(name);
    }
  }
  async function getMenuItems() {
    const res = await axiosGet(`/api/dishes/${pageMode.category}`);
    setMenuItemsData(res.dishes);
  }

  const dishes = menuItemsData.map((item) => (
    <MenuItemCard
      menuItem={item}
      expandMenuItem={expandMenuItem}
      selectedMenuItem={selectedMenuItem}
      key={item.name}
    />
  ));

  useEffect(() => {
    getMenuItems();
  }, []);

  return (
    <div className="home-page-div">
      <div className="category-header-div" style={{ left: `${categoryHeaderPos}vw` }}>
        <h3>{pageMode.category} </h3>
        <h3>menu</h3>
      </div>
      <div className="menuitems-main-div">{dishes}</div>
    </div>
  );
}

MenuItems.propTypes = {
  pageMode: PropTypes.object,
  categoryHeaderPos: PropTypes.string,
};

export default MenuItems;
