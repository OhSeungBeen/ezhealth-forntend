import React from 'react';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';

import Footer from '../components/footer/Footer.js';
import GridContainer from '../components/grid/GridContainer.js';
import GridItem from '../components/grid/GridItem.js';
import Parallax from '../components/parallax/Parallax.js';

import styles from '../styles/jss/nextjs-material-kit/pages/index.js';

import HeaderContainer from '../containers/common/HeaderContainer.js';

const useStyles = makeStyles(styles);

export default function index(props) {
  const classes = useStyles();
  return (
    <div>
      <HeaderContainer />
      <Parallax image="/img/header.jpg">
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Personal Training Plans.</h1>
                <h3 className={classes.subtitle}>Personal Training Plans.</h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <Footer />
    </div>
  );
}
