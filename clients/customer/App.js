import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/menu.scss';
import Home from './pages/Home';
import Cart from './components/Cart';
import Topbar from './components/ui/Topbar';

function App() {
  // function
  const [sessionData, setSessionData] = useState({});
  const [pageMode, setPageMode] = useState({ mode: 'home', category: '' });

  function goHome() {
    setPageMode('');
    setPageMode({ mode: 'home', category: '' });
  }

  let backdrop;
  switch (pageMode.mode) {
    case 'menuitems':
      backdrop = <div className="backdrop-solid menuitems" />;
      break;
    case 'orders':
      backdrop = <div className="backdrop-solid orders" />;
      break;
    default:
      backdrop = <div className="backdrop-solid home" />;
      break;
  }

  return (
    <Router>
      <div className="main-div">
        <Topbar goHome={goHome} />
        {backdrop}
        <Switch>
          <Route>
            <Home setPageMode={setPageMode} pageMode={pageMode} />
            <Cart sessionData={sessionData} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
