import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import * as userAPI from '../lib/api/user';
import createRequestSaga from '../lib/createRequestSaga';

// action
const TEMP_SET_USER = 'user/TEMP_SET_USER';
const CHECK = 'user/CHECK';
const CHECK_SUCCESS = 'user/CHECK_SUCCESS';
const CHECK_FAILURE = 'user/CHECK_FAILURE';
const LOGOUT = 'user/LOGOUT';
const COUNT_ALL = 'user/COUNT_ALL';
const COUNT_ALL_SUCCESS = 'user/COUNT_ALL_SUCCESS';
const COUNT_ALL_FAILURE = 'user/COUNT_ALL_FAILURE';

// action create function
export const tempSetUserAction = createAction(TEMP_SET_USER, (user) => user);
export const checkUserAction = createAction(CHECK);
export const logoutAction = createAction(LOGOUT);
export const countAllAction = createAction(COUNT_ALL);

// saga
const checkSaga = createRequestSaga(CHECK, authAPI.loginCheck);
function* checkFailureSaga() {
  try {
    localStorage.removeItem('user');
  } catch (e) {
    console.log(e);
  }
}
function* logoutSaga() {
  try {
    yield call(authAPI.logout);
    localStorage.removeItem('user');
  } catch (e) {
    console.log(e);
  }
}
const countAllSaga = createRequestSaga(COUNT_ALL, userAPI.countAll);

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(COUNT_ALL, countAllSaga);
}

// reducer
const initialSate = {
  user: null,
  checkError: null,
  count: 0,
  countError: null,
};

export default handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: user }) => ({
      ...state,
      user,
    }),
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      checkError: error,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      user: null,
    }),
    [COUNT_ALL_SUCCESS]: (state, { payload: count }) => ({
      ...state,
      count: count.count,
      countError: null,
    }),
    [COUNT_ALL_FAILURE]: (state, { payload: error }) => ({
      ...state,
      count: null,
      countError: error,
    }),
  },
  initialSate,
);
