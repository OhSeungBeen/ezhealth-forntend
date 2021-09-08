import React, { useEffect } from 'react';
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
import DateRange from '@material-ui/icons/DateRange';
import Accessibility from '@material-ui/icons/Accessibility';
// core components
import GridItem from 'components/grid/GridItem.js';
import GridContainer from 'components/grid/GridContainer.js';
import Card from 'components/card/Card.js';
import CardHeader from 'components/card/CardHeader.js';
import CardIcon from 'components/card/CardIcon.js';
import CardBody from 'components/card/CardBody.js';

import dashboardStyles from 'styles/jss/nextjs-material-dashboard/views/dashboardStyle.js';
import { cardTitle } from 'styles/jss/nextjs-material-kit.js';
import { useDispatch, useSelector } from 'react-redux';
import { countAllAction } from '../../modules/user';

const styles = {
  dashboardStyles,
  cardTitle,
};

const DashboardContainer = () => {
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
              <DateRange /> 총 게시글 수
            </CardIcon>
          </CardHeader>
          <CardBody>
            <h4 className={classes.cardTitle}>1,000 개</h4>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default DashboardContainer;
