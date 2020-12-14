import React, { useState, useEffect } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import './styles/menu.scss';
import { axiosGet } from '../shared/helpers/api';
import socket from '../shared/helpers/socket';
import Home from './pages/Home';
import Cart from './components/Cart';
import Topbar from './components/ui/Topbar';
import Orders from './pages/Orders';

function App() {
  const [sessionData, setSessionData] = useState({});
  const [pageMode, setPageMode] = useState({ mode: 'home', category: '' });

  function goHome() {
    setPageMode({ mode: 'home', category: '' });
  }

  // FUNCTION CALL TO RE-RENDER
  async function getSessionData(tableno) {
    const res = await axiosGet(`/api/tables/${tableno}`);
    setSessionData(res.table.session);
    socket.connect(res.table.session.session);
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

  useEffect(() => {}, []);

  return (
    <>
      <div className="main-div">
        <Topbar goHome={goHome} />
        {backdrop}
        <Switch>
          <Route path="/" exact>
            <NavLink to="/table/1">Table 1</NavLink>
            <NavLink to="/table/2">Table 2</NavLink>
            <NavLink to="/table/3">Table 3</NavLink>
            {/* <Home setPageMode={setPageMode} pageMode={pageMode} /> */}
            {/* <Cart sessionData={sessionData} /> */}
            <div className="main-div" />
          </Route>
          <Route path="/table/:tableno">
            <Home
              setPageMode={setPageMode}
              pageMode={pageMode}
              getSessionData={getSessionData}
              cartData={sessionData.cart}
              sessionData={sessionData}
            />
            <Cart cartData={sessionData.cart} sessionId={sessionData._id} getSessionData={getSessionData} />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
