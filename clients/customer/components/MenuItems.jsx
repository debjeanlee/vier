import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import MenuItemCard from './ui/MenuItemCard';

function MenuItems({ pageMode, categoryHeaderPos }) {
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const [menuItemsData, setMenuItemsData] = useState([]);

  async function getMenuItems() {
    try {
      const res = await axios.get(`/api/dishes/${pageMode.category}`);
      setMenuItemsData(res.data.dishes);
    } catch (err) {
      throw new Error(err);
    }
  }

  function expandMenuItem(name) {
    if (selectedMenuItem === name) {
      setSelectedMenuItem('');
    } else {
      setSelectedMenuItem(name);
    }
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
