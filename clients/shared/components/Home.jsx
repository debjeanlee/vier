import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Log from './sub/Log';
import '../styles/home.scss';

function Home({ setIsAuth }) {
  const authURL = process.env.AUTH;
  const [showReg, setShowReg] = useState(false);

  function clickHandler() {
    setShowReg(!showReg);
  }

  return (
    <div className="login-page">
      <h3>Service Login</h3>
      {showReg && (
        <>
          <div className="login-container">
            <div className="container">
              <h1>Register</h1>
              <Log id="Register" setIsAuth={setIsAuth} url={`${authURL}/register`} />
            </div>
          </div>
          <div className="sm-container">
            <p>
              Already registered?
              <span onClick={clickHandler}>Login here.</span>
            </p>
          </div>
        </>
      )}
      {!showReg && (
        <>
          <div className="login-container">
            <div className="container">
              <h1>Login</h1>
              <Log id="Login" setIsAuth={setIsAuth} url={`${authURL}/login`} />
            </div>
          </div>
          <div className="sm-container">
            <p>
              Don't have an account?
              <span onClick={clickHandler}>Register here.</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

Home.propTypes = {
  setIsAuth: PropTypes.func,
};

export default Home;
