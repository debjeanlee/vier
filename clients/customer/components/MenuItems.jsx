import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MenuItemCard from './ui/MenuItemCard';

function MenuItems({ categoryHeaderPos, pageMode, menuData }) {
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const [menuItemsData, setMenuItemsData] = useState([]);

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
      setSelectedMenuItem={setSelectedMenuItem}
      key={item.name}
    />
  ));

  useEffect(() => {
    const index = menuData.findIndex((item) => item.category === pageMode.category);
    setMenuItemsData(menuData[index].items);
  }, []);

  return (
    <div className="home-page-div">
      <div className="category-header-div" style={{ left: `${categoryHeaderPos}vw` }}>
        <h3>{pageMode.category}</h3>
        <h3>menu</h3>
      </div>
      <div className="menuitems-main-div">{dishes}</div>
    </div>
  );
}

MenuItems.propTypes = {
  pageMode: PropTypes.object,
  categoryHeaderPos: PropTypes.string,
  menuData: PropTypes.array,
};

export default MenuItems;
