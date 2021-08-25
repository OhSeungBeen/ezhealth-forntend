import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Head from 'next/head';
import Router from 'next/router';

import wrapper from '../store/configureStore';

import PageChange from '../components/pageChange/PageChange.js';

import 'styles/scss/nextjs-material-kit.scss?v=1.2.0';

import { useDispatch } from 'react-redux';
import { tempSetUserAction, checkUserAction } from '../modules/user';

Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add('body-page-transition');
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById('page-transition'),
  );
});
Router.events.on('routeChangeComplete', () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'));
  document.body.classList.remove('body-page-transition');
});
Router.events.on('routeChangeError', () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'));
  document.body.classList.remove('body-page-transition');
});

const MyApp = ({ Component, pageProps }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    let comment = document.createComment(``);
    document.insertBefore(comment, document.documentElement);
  }, []);

  useEffect(() => {
    const user = localStorage.user;
    if (!user) return;
    dispatch(tempSetUserAction(JSON.parse(user)));
    dispatch(checkUserAction());
  }, []);

  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>EZhealth</title>
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
  );
};

MyApp.getInitialProps = async ({ Component, router, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

export default wrapper.withRedux(MyApp);
