import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/common/header/Header';
import HeaderLinks from '../../components/common/header/HeaderLinks';
import { logoutAction } from '../../modules/user';

const HeaderContainer = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  const onLogout = useCallback(() => {
    dispatch(logoutAction());
  }, []);

  return (
    <Header
      brand="EZhealth"
      rightLinks={<HeaderLinks user={user} onLogout={onLogout} />}
      fixed
      color="transparent"
      changeColorOnScroll={{
        height: 400,
        color: 'white',
      }}
    />
  );
};

export default HeaderContainer;
