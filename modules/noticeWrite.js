import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import * as noticeAPI from '../lib/api/notice';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'noticeWrite/INITIALIZE';
const CHANGE_FIELD = 'noticeWrite/CHANGE_FIELD';
const WRITE_NOTICE = 'noticeWrite/WRITE_NOTICE';
const WRITE_NOTICE_SUCCESS = 'noticeWrite/WRITE_NOTICE_SUCCESS';
const WRITE_NOTICE_FAILURE = 'noticeWrite/WRITE_NOTICE_FAILURE';

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const writePost = createAction(WRITE_NOTICE, ({ title, body }) => ({
  title,
  body,
}));

const writeNoticeSaga = createRequestSaga(WRITE_NOTICE, noticeAPI.writeNotice);
export function* noticeWriteSaga() {
  yield takeLatest(WRITE_NOTICE, writeNoticeSaga);
}

const initialState = {
  title: '',
  content: '',
  notice: null,
  noticeError: null,
};

const noticeWrite = handleActions(
  {
    [INITIALIZE]: (state) => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [WRITE_NOTICE]: (state) => ({
      ...state,
      notice: null,
      postError: null,
    }),
    [WRITE_NOTICE_SUCCESS]: (state, { payload: notice }) => ({
      ...state,
      notice,
    }),
    [WRITE_NOTICE_FAILURE]: (state, { payload: noticeError }) => ({
      ...state,
      noticeError,
    }),
  },
  initialState,
);

export default noticeWrite;
