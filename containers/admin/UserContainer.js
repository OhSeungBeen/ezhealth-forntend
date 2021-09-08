import React, { useEffect } from 'react';
// react plugin for creating charts
import { useDispatch, useSelector } from 'react-redux';
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
import Accessibility from '@material-ui/icons/Accessibility';
// core components
import GridItem from 'components/grid/GridItem.js';
import GridContainer from 'components/grid/GridContainer.js';
import Card from 'components/card/Card.js';
import CardHeader from 'components/card/CardHeader.js';
import CardIcon from 'components/card/CardIcon.js';
import CardBody from 'components/card/CardBody.js';
// style
import dashboardStyles from 'styles/jss/nextjs-material-dashboard/views/dashboardStyle.js';
import { cardTitle } from 'styles/jss/nextjs-material-kit.js';

import { countAllAction } from '../../modules/user';

const styles = {
  dashboardStyles,
  cardTitle,
};

const UserContainer = () => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const dispatch = useDispatch();
  const { userCount } = useSelector(({ user }) => ({
    userCount: user.count,
  }));

  useEffect(() => {
    dispatch(countAllAction());
  }, [dispatch]);
  return (
    <>
      <GridContainer>
        <GridItem xs={6} sm={12} md={4}>
          <Card>
            <CardHeader color="success">
              <CardIcon color="transparent">
                <Accessibility /> 총 회원 수
              </CardIcon>
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>{userCount} 명</h4>
              <p></p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={6} sm={12} md={4}>
          <Card>
            <CardHeader color="warning">
              <CardIcon color="transparent">
                <Accessibility /> 당일 가입자 수
              </CardIcon>
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>{userCount} 명</h4>
              <p></p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={6} sm={12} md={4}>
          <Card>
            <CardHeader color="danger">
              <CardIcon color="transparent">
                <Accessibility /> 당일 탈퇴자 수
              </CardIcon>
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>{userCount} 명</h4>
              <p></p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer></GridContainer>
    </>
  );
};

export default UserContainer;
