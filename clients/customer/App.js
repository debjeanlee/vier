import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import './styles/menu.scss';
import { faShoppingBasket, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cart from './components/Cart';
import Topbar from "./components/ui/Topbar";

function App() {
  // function
  const [sessionData, getSessionData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [backdropWidth, setBackdropWidth] = useState('35');

  function goHome() {
    setSelectedCategory('');
    setBackdropWidth('35');
  }

  return (
    <Router>
      <div className="main-div">
        <Topbar goHome={goHome} />
        <div className="backdrop-solid" style={{ width: `${backdropWidth}vw` }} />
        <Switch>
          <Route>
            <Home
              setBackdropWidth={setBackdropWidth}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
            <Cart session={sessionData} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
