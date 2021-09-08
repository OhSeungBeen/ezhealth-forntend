import React from 'react';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';

import HeaderContainer from '../containers/common/HeaderContainer';
import Footer from '../components/footer/Footer';
import Parallax from '../components/parallax/Parallax.js';

import styles from 'styles/jss/nextjs-material-kit/pages/notice.js';
import NoticeWriteContainer from '../containers/notice/NoticeWriteContainer';

const useStyles = makeStyles(styles);

const noticeWrite = () => {
  const classes = useStyles();
  return (
    <>
      <HeaderContainer />
      <Parallax image="/img/header.jpg" small={true}></Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <NoticeWriteContainer />
        </div>
      </div>
      <Footer whiteFont />
    </>
  );
};

export default noticeWrite;
