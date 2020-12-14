import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useParams, NavLink } from 'react-router-dom';
import './styles/menu.scss';
import axios from 'axios';
import Home from './pages/Home';
import Cart from './components/Cart';
import Topbar from './components/ui/Topbar';

function App() {
  const [sessionData, setSessionData] = useState({});
  const [pageMode, setPageMode] = useState({ mode: 'home', category: '' });
  const { tableno } = useParams();

  function goHome() {
    setPageMode({ mode: 'home', category: '' });
  }

  function goOrders() {
    setPageMode({ mode: 'orders', category: '' });
  }

  async function getSessionData(tableno) {
    try {
      const res = await axios.get(`/api/tables/${tableno}`);
      console.log('session', res.data.table);
      setSessionData(res.data.table);
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

  useEffect(() => {}, []);

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
            {/* <Home setPageMode={setPageMode} pageMode={pageMode} /> */}
            {/* <Cart sessionData={sessionData} /> */}
            <div className="main-div" />
          </Route>
          <Route path="/table/:tableno">
            <Home
              setPageMode={setPageMode}
              pageMode={pageMode}
              getSessionData={getSessionData}
              sessionData={sessionData}
            />
            <Cart sessionData={sessionData} />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
