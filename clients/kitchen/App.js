import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from '../shared/components/PrivateRoute';
import Home from '../shared/components/Home';
import Dashboard from './pages/Dashboard';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <div className="login-page">
      {/* TEMP SO DONT NEED TO KEEP LOGGING IN  */}
      <Dashboard />
      <div>
        {/* {isAuth ? '' : <h3>Kitchen Login</h3>} */}
        {/* <Switch>
          <Route exact path="/">
            {isAuth ? <Redirect to="/dashboard" /> : <Home setIsAuth={setIsAuth} />}
          </Route>
          <PrivateRoute exact path="/dashboard" component={Dashboard} isAuth={isAuth} />
        </Switch> */}
      </div>
    </div>
  );
}

export default App;
