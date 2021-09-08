import React from 'react';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';

import HeaderContainer from '../containers/common/HeaderContainer';
import Footer from '../components/footer/Footer';
import NoticeViewerContainer from '../containers/notice/NoticeViewerContainer';
import Parallax from '../components/parallax/Parallax.js';

import styles from 'styles/jss/nextjs-material-kit/pages/notice.js';
import NoticeWriter from '../components/notice/NoticeWrite';

const useStyles = makeStyles(styles);

const notice = () => {
  const classes = useStyles();
  return (
    <>
      <HeaderContainer />
      <Parallax image="/img/header.jpg" small={true}></Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <NoticeViewerContainer />
        </div>
      </div>
      <Footer whiteFont />
    </>
  );
};

export default notice;
