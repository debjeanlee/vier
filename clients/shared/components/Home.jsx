import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Log from './sub/Log';

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
        <Log id="Register" setIsAuth={setIsAuth} logLabel="Register" url={`${authURL}/register`} />
      )}
      {!showReg && (
        <Log id="Login" setIsAuth={setIsAuth} logLabel="Login" url={`${authURL}/login`} />
      )}
    </div>
  );
}

Home.propTypes = {
  setIsAuth: PropTypes.func,
};

export default Home;
