import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MenuItemCard from './ui/MenuItemCard';

function MenuItems({ categoryHeaderPos, pageMode, menuData, cartData, sessionId }) {
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const [menuItemsData, setMenuItemsData] = useState([]);

  function expandMenuItem(name) {
    if (selectedMenuItem === name) {
      setSelectedMenuItem('');
    } else {
      setSelectedMenuItem(name);
    }
  }

  const dishes = menuItemsData.map((menuItem) => {
    const cartIndex = cartData.findIndex((cartItem) => cartItem.dish.name === menuItem.name);
    if (cartIndex > -1) {
      return (
        <MenuItemCard
          menuItem={menuItem}
          expandMenuItem={expandMenuItem}
          selectedMenuItem={selectedMenuItem}
          setSelectedMenuItem={setSelectedMenuItem}
          key={menuItem.name}
          sessionId={sessionId}
          quantity={cartData[cartIndex].quantity}
        />
      );
    }
    return (
      <MenuItemCard
        menuItem={menuItem}
        expandMenuItem={expandMenuItem}
        selectedMenuItem={selectedMenuItem}
        setSelectedMenuItem={setSelectedMenuItem}
        key={menuItem.name}
        sessionId={sessionId}
        quantity={0}
      />
    );
  });

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
  cartData: PropTypes.array,
};

export default MenuItems;
