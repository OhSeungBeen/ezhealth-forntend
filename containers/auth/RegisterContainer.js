import React, { useCallback, useEffect } from 'react';
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
import joiPassword from '../../node_modules/joi-password-complexity/lib';
// core components
import GridContainer from '../../components/grid/GridContainer.js';
import GridItem from '../../components/grid/GridItem.js';
import Button from '../../components/buttons/Button.js';
import Card from '../../components/card/Card.js';
import CardBody from '../../components/card/CardBody.js';
import CardHeader from '../../components/card/CardHeader.js';
import CardFooter from '../../components/card/CardFooter.js';
import CustomInput from '../../components/input/CustomInput.js';
// style
import styles from 'styles/jss/nextjs-material-kit/pages/loginPage.js';

import { useDispatch, useSelector } from 'react-redux';
import {
  changeFieldAction,
  initializeAction,
  registerAction,
} from '../../modules/auth';
import { checkUserAction } from '../../modules/user';

const useStyles = makeStyles(styles);

const RegisterForm = () => {
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
  const [errorPasswordConfirm, setErrorPasswordConfirm] = React.useState({
    error: false,
    errorText: '',
  });

  const dispatch = useDispatch();
  const { register, auth, authError, user } = useSelector(({ auth, user }) => ({
    register: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  const onChange = useCallback((e) => {
    const { value, name } = e.target;
    dispatch(
      changeFieldAction({
        form: 'register',
        key: name,
        value,
      }),
    );
  }, []);

  const onSubmit = (e) => {
    const { username, password, passwordConfirm } = register;

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
    setErrorPasswordConfirm({
      ...errorPasswordConfirm,
      error: false,
      errorText: '',
    });

    // 유효성 검사
    // 아이디 숫자 또는 문자외 값(3~20자) 포함
    const validateId = joi
      .string()
      .alphanum()
      .min(3)
      .max(20)
      .required()
      .validate(username);
    if (validateId.error) {
      setErrorId({
        ...errorId,
        error: true,
        errorText: 'characters and numbers(3 to 20 characters)',
      });
    }

    const passwordOptions = {
      min: 8,
      max: 20,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 2,
    };

    // // 패스워드 대/소문자, 숫자, 특수기호(8~20)자 조합2개이상 포함
    // const validatePaasword = joiPassword(passwordOptions).validate(password);
    // if (validatePaasword.error) {
    //   setErrorPassword({
    //     ...errorPassword,
    //     error: true,
    //     errorText:
    //       'combination of at least 2 lowercase/uppercase letters/numeric/special characters(8-20 characters)',
    //   });
    // }

    // // 패스워드 확인
    // // 패스워드 대/소문자, 숫자, 특수기호(8~20)자 조합2개이상 포함
    // const validatePaaswordConfirm =
    //   joiPassword(passwordOptions).validate(passwordConfirm);
    // if (validatePaaswordConfirm.error) {
    //   setErrorPasswordConfirm({
    //     ...errorPasswordConfirm,
    //     error: true,
    //     errorText:
    //       'combination of at least 2 lowercase/uppercase letters/numeric/special characters(8-20 characters)',
    //   });
    // }

    if (password !== passwordConfirm) {
      setErrorPasswordConfirm({
        ...errorPasswordConfirm,
        error: true,
        errorText: 'passwords do not match',
      });
      validatePaaswordConfirm.error = 'passwords do not match';
    }

    if (
      validateId.error //||
      // validatePaasword.error ||
      // validatePaaswordConfirm.error
    ) {
      return;
    }

    dispatch(registerAction({ username, password }));
  };

  useEffect(() => {
    dispatch(initializeAction('register'));
  }, [dispatch]);

  // 로그인 상태일 경우
  useEffect(() => {
    if (user) {
      Router.push('/');
    }
  }, [Router, user]);

  useEffect(() => {
    setTimeout(function () {
      setCardAnimation('');
    }, 700);
  }, []);

  useEffect(() => {
    // 가입 실패
    if (authError) {
      // 계정이 이미 존재
      if (authError.response.status === 409) {
        setErrorId({
          ...errorId,
          error: true,
          errorText: 'this account already exists',
        });
        return;
      }
    }

    // 가입 성공
    if (auth) {
      dispatch(checkUserAction());
    }
  }, [dispatch, authError, auth]);

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
                  <b>Join</b>
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
                  value={register.username}
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
                  value={register.password}
                  onChange={onChange}
                  onKeyPress={onKeyPress}
                />
                <CustomInput
                  labelText="Password Confirm"
                  id="pass-confirm"
                  name="passwordConfirm"
                  formControlProps={{
                    error: errorPasswordConfirm.error,
                    fullWidth: true,
                  }}
                  errorText={errorPasswordConfirm.errorText}
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
                  value={register.passwordConfirm}
                  onChange={onChange}
                  onKeyPress={onKeyPress}
                />
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

export default RegisterForm;
