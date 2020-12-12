import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { axiosGet } from '../../shared/helpers/api';
import MenuItemCard from './ui/MenuItemCard';

function MenuItems({ selectedCategory, categoryHeaderPos }) {
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const [menuItemsData, setMenuItemsData] = useState([]);

  async function getMenuItems() {
    const res = await axiosGet(`/api/dishes/${selectedCategory}`);
    setMenuItemsData(res.dishes);
  }

  const dishes = menuItemsData.map((dish) => (
    <MenuItemCard
      menuItem={dish}
      selectedMenuItem={selectedMenuItem}
      setSelectedMenuItem={setSelectedMenuItem}
      key={dish.name}
    />
  ));

  useEffect(() => {
    getMenuItems();
  }, []);

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
