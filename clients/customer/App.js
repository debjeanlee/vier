import React, { useState, useEffect } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import { axiosGet } from '../shared/helpers/api';
import socket from '../shared/helpers/socket';
import Home from './pages/Home';
import Cart from './pages/components/Cart';
import Topbar from './pages/components/ui/Topbar';
import Checkout from './pages/Checkout';

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
    socket.session(res.table.session.session);
  }

  function goOrders() {
    setPageMode({ mode: 'orders', category: '' });
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
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div className="main-div">
        <Topbar goHome={goHome} goOrders={goOrders} />
        {backdrop}
        <Switch>
          <Route path="/" exact>
            <NavLink to="/table/1">Table 1</NavLink>
            <NavLink to="/table/2">Table 2</NavLink>
            <NavLink to="/table/3">Table 3</NavLink>
            <NavLink to="/table/4">Table 4</NavLink>
            <NavLink to="/table/5">Table 5</NavLink>
            <NavLink to="/table/6">Table 6</NavLink>
            <NavLink to="/table/7">Table 7</NavLink>
            <NavLink to="/table/8">Table 8</NavLink>
            <NavLink to="/table/9">Table 9</NavLink>
            <NavLink to="/table/10">Table 10</NavLink>
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
            {pageMode.mode === 'orders' ? (
              ''
            ) : (
              <Cart cartData={sessionData.cart} sessionId={sessionData._id} getSessionData={getSessionData} />
            )}
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
