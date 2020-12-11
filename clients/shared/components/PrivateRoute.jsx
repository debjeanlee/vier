import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ component: Component, isAuth, ...rest }) {
  return <Route {...rest}>{isAuth ? <Component {...rest} /> : <Redirect to="/" />}</Route>;
}

PrivateRoute.propTypes = {
  component: PropTypes.elementType,
  isAuth: PropTypes.bool,
};

export default PrivateRoute;
