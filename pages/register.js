import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import HeaderContainer from '../containers/common/HeaderContainer.js';
import Footer from '../components/footer/Footer.js';

import RegisterFormContainer from '../containers/auth/RegisterContainer';

import styles from 'styles/jss/nextjs-material-kit/pages/loginPage.js';

const useStyles = makeStyles(styles);

const Register = () => {
  const classes = useStyles();
  return (
    <div>
      <HeaderContainer />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url('/img/register.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      >
        <RegisterFormContainer />
        <Footer whiteFont />
      </div>
    </div>
  );
};

export default Register;
