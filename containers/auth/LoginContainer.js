import React, { useCallback, useEffect, useRef } from 'react';
import Router from 'next/router';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
// @material-ui/icons
import Person from '@material-ui/icons/Person';
// validator
import joi from '../../node_modules/joi/lib';
// core components
import GridContainer from '../../components/grid/GridContainer.js';
import GridItem from '../../components/grid/GridItem.js';
import Button from '../../components/buttons/Button.js';
import Card from '../../components/card/Card.js';
import CardBody from '../../components/card/CardBody.js';
import CardHeader from '../../components/card/CardHeader.js';
import CardFooter from '../../components/card/CardFooter.js';
import CustomInput from '../../components/input/CustomInput.js';
import Danger from 'components/Typography/Danger.js';

import styles from 'styles/jss/nextjs-material-kit/pages/loginPage.js';

import { useDispatch, useSelector } from 'react-redux';
import {
  changeFieldAction,
  initializeAction,
  loginAction,
} from '../../modules/auth';
import { checkUserAction } from '../../modules/user';

const useStyles = makeStyles(styles);

const LoginForm = () => {
  const classes = useStyles();

  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden');
  const [errorId, setErrorId] = React.useState({
    error: false,
    errorText: '',
  });
  const [errorPassword, setErrorPassword] = React.useState({
    error: false,
    errorText: '',
  });
  const [error, setError] = React.useState({
    error: false,
    errorText: '',
  });

  const dispatch = useDispatch();
  const { login, auth, authError, user } = useSelector(({ auth, user }) => ({
    login: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const onChange = useCallback((e) => {
    const { value, name } = e.target;
    dispatch(
      changeFieldAction({
        form: 'login',
        key: name,
        value,
      }),
    );
  }, []);

  const onSubmit = (e) => {
    //e.preventDefault();
    const { username, password } = login;

    // 에러 초기화
    setErrorId({
      ...errorId,
      error: false,
      errorText: '',
    });
    setErrorPassword({
      ...errorPassword,
      error: false,
      errorText: '',
    });
    setError({
      ...error,
      error: false,
      errorText: '',
    });

    // 유효성 검사
    // 아이디 필수
    const validateId = joi.string().required().validate(username);
    if (validateId.error) {
      setErrorId({
        ...errorId,
        error: true,
        errorText: 'please enter your ID',
      });
    }

    // 비밀번호 필수
    const validatePaasword = joi.string().required().validate(password);
    if (validatePaasword.error) {
      setErrorPassword({
        ...errorPassword,
        error: true,
        errorText: 'please enter your password',
      });
    }
    if (validateId.error || validatePaasword.error) {
      return;
    }

    dispatch(
      loginAction({
        username: username,
        password: password,
      }),
    );
  };

  // 초기화
  useEffect(() => {
    setTimeout(function () {
      setCardAnimation('');
    }, 700);
  }, []);

  useEffect(() => {
    dispatch(initializeAction('login'));
  }, [dispatch]);

  // 로그인 상태일 경우
  useEffect(() => {
    if (user) {
      Router.push('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log(e);
      }
    }
  }, [user]);

  // 로그인 검증
  useEffect(() => {
    // 로그인 실패
    if (authError) {
      if (authError.response.status === 401) {
        setError({
          error,
          error: true,
          errorText: 'ID or password do not match',
        });
        return;
      }
    }
    // 로그인 성공
    if (auth) {
      dispatch(checkUserAction());
    }
  }, [auth, authError]);

  // 엔터키 이벤트
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <Card className={classes[cardAnimaton]}>
            <form className={classes.form}>
              <CardHeader color="primary" className={classes.cardHeader}>
                <h4>
                  <b>Login</b>
                </h4>
                <div className={classes.socialLine}>
                  <Button
                    justIcon
                    href="#pablo"
                    target="_blank"
                    color="transparent"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className={'fab fa-twitter'} />
                  </Button>
                  <Button
                    justIcon
                    href="#pablo"
                    target="_blank"
                    color="transparent"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className={'fab fa-facebook'} />
                  </Button>
                  <Button
                    justIcon
                    href="#pablo"
                    target="_blank"
                    color="transparent"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className={'fab fa-google-plus-g'} />
                  </Button>
                </div>
              </CardHeader>
              <p className={classes.divider}>
                <b>Or Be Classical</b>
              </p>
              <CardBody>
                <CustomInput
                  labelText="ID"
                  id="first"
                  name="username"
                  formControlProps={{
                    error: errorId.error,
                    fullWidth: true,
                  }}
                  errorText={errorId.errorText}
                  inputProps={{
                    type: 'text',
                    endAdornment: (
                      <InputAdornment position="end">
                        <Person className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  }}
                  value={login.username}
                  onChange={onChange}
                  onKeyPress={onKeyPress}
                />
                <CustomInput
                  labelText="Password"
                  id="pass"
                  name="password"
                  formControlProps={{
                    error: errorPassword.error,
                    fullWidth: true,
                  }}
                  errorText={errorPassword.errorText}
                  inputProps={{
                    type: 'password',
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputIconsColor}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                    autoComplete: 'off',
                  }}
                  onChange={onChange}
                  value={login.password}
                  onKeyPress={onKeyPress}
                />
                {error && (
                  <Danger>
                    <h6>{error.errorText}</h6>
                  </Danger>
                )}
              </CardBody>
              <CardFooter className={classes.cardFooter}>
                <Button simple color="primary" size="lg" onClick={onSubmit}>
                  <KeyboardArrowRightIcon />
                  Get started
                </Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default LoginForm;
