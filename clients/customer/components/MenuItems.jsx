import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import MenuItemCard from './ui/MenuItemCard';

function MenuItems({ selectedCategory, categoryHeaderPos }) {
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const [menuItemsData, setMenuItemsData] = useState([]);

  async function getMenuItems() {
    try {
      const res = await axios.get(`/api/dishes/${selectedCategory}`);
      setMenuItemsData(res.data.dishes);
    } catch (err) {
      throw new Error(err);
    }
  }

  useEffect(() => {
    getMenuItems();
  }, []);

  function expandMenuItem(name) {
    if (selectedMenuItem === name) {
      setSelectedMenuItem('');
    } else {
      setSelectedMenuItem(name);
    }
  }

  const dishes = menuItemsData.map((dish) => (
    <MenuItemCard
      menuItem={dish}
      expandMenuItem={expandMenuItem}
      selectedMenuItem={selectedMenuItem}
      key={dish.name}
    />
  ));

  return (
    <div className="home-page-div">
      <div className="category-header-div" style={{ left: `${categoryHeaderPos}vw` }}>
        <h3>{selectedCategory} </h3>
        <h3>menu</h3>
      </div>
      <div className="menuitems-main-div">{dishes}</div>
    </div>
  );
}

MenuItems.propTypes = {
  selectedCategory: PropTypes.string,
  categoryHeaderPos: PropTypes.string,
};

export default MenuItems;
