import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Log from '../../shared/components/Log';

function Home({ setIsAuth }) {
  const authURL = process.env.AUTH;
  const [showReg, setShowReg] = useState(true);

  function clickHandler() {
    setShowReg(!showReg);
  }

  return (
    <div>
      <div>
        <button onClick={clickHandler}>Register</button>
        <button onClick={clickHandler}>Login</button>
      </div>
      {showReg && (
        <Fragment>
          <h1>Register</h1>
          <Log id="Register" setIsAuth={setIsAuth} url={`${authURL}/register`} />
        </Fragment>
      )}
      {!showReg && (
        <Fragment>
          <h1>Login</h1>
          <Log id="Login" setIsAuth={setIsAuth} url={`${authURL}/login`} />
        </Fragment>
      )}
    </div>
  );
}

Home.propTypes = {
  setIsAuth: PropTypes.func,
};

export default Home;
