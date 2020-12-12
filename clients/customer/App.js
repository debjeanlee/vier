import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/menu.scss';
import Home from './pages/Home';
import Cart from './components/Cart';
import Topbar from './components/ui/Topbar';

function App() {
  // function
  const [sessionData, setSessionData] = useState({});
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
            <Cart sessionData={sessionData} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
