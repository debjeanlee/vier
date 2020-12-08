import React from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import '../shared/styles/main.scss';

function App() {
  return (
    <Router>
      <div className="main-div">
        <div className="topbar">
          <div>Home</div>
          <div>Orders</div>
        </div>
          <div className="backdrop-solid"></div>
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
