import React from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import '../shared/styles/main.scss';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  return (
    <Router>
      <div className="main-div">
        <div className="topbar">
          <div>Home</div>
          <FontAwesomeIcon icon={faShoppingBasket} className="fa-shopping" />
        </div>
        <div className="backdrop-solid" />
        <Switch>
          <Route>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
