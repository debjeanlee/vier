import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '../shared/components/PrivateRoute';
import Home from '../shared/components/Home';
import Dashboard from './pages/Dashboard';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <BrowserRouter basename="/service">
      <h1>Service</h1>
      <Switch>
        <Route exact path="/">
          {isAuth ? <Redirect to="/dashboard" /> : <Home setIsAuth={setIsAuth} />}
        </Route>
        <PrivateRoute exact path="/dashboard" component={Dashboard} isAuth={isAuth} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
