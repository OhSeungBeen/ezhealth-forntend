import React, { useState } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import HeaderContainer from '../containers/common/HeaderContainer.js';
import Footer from '../components/footer/Footer.js';

import LoginFormContainer from '../containers/auth/LoginContainer';

import styles from 'styles/jss/nextjs-material-kit/pages/loginPage.js';

const useStyles = makeStyles(styles);

const Login = () => {
  const classes = useStyles();

  return (
    <div>
      <HeaderContainer />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url('/img/login.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      >
        <LoginFormContainer />
        <Footer whiteFont />
      </div>
    </div>
  );
};

export default Login;
