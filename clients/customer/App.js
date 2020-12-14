import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles/menu.scss';
import axiosGet from 'axios';
import Home from './pages/Home';
import Cart from './components/Cart';
import Topbar from './components/ui/Topbar';
import Orders from './pages/Orders';

function App() {
  const [sessionData, setSessionData] = useState({});
  const [pageMode, setPageMode] = useState({ mode: 'home', category: '' });

  function goHome() {
    setPageMode('');
    setPageMode({ mode: 'home', category: '' });
  }

  async function getSessionData() {
    try {
      const res = await axiosGet('/api/tables/1');
      // console.log('session', res.data.session[0]);
      setSessionData(res.data.session[0]);
    } catch (err) {
      console.log(err);
    }
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

  useEffect(() => {
    getSessionData();
  }, []);

  return (
    <>
      <div className="main-div">
        <Topbar goHome={goHome} />
        {backdrop}
        <Switch>
          <Route>
            <Home setPageMode={setPageMode} pageMode={pageMode} />
            <Cart sessionData={sessionData} />
            <Orders />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
