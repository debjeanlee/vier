import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '../shared/components/PrivateRoute';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <BrowserRouter basename="/service">
      <Switch>
        <Route exact path="/">
          {isAuth ? <Redirect to="/dashboard" /> : <Home />}
        </Route>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
