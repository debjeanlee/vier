import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect, NavLink } from 'react-router-dom';
import PrivateRoute from '../shared/components/PrivateRoute';
import './styles/service.scss';
import Home from '../shared/components/Home';
import Dashboard from './pages/Dashboard';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <BrowserRouter basename="/service">
      <h1>Service</h1>
      <NavLink to="/tester">Tester</NavLink>
      <Switch>
        <Route exact path="/">
          {isAuth ? <Redirect to="/dashboard" /> : <Home setIsAuth={setIsAuth} />}
        </Route>
        <PrivateRoute exact path="/dashboard" component={Dashboard} isAuth={isAuth} />
        <Route path="/tester">
          <Dashboard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
