import { createAction, handleActions } from 'redux-actions';
import createRequestSaga from '../lib/createRequestSaga';
import * as noticeAPI from '../lib/api/notice';
import { takeLatest } from 'redux-saga/effects';

const READ_NOTICE = 'notice/READ_NOTICE';
const READ_NOTICE_SUCCESS = 'notice/READ_NOTICE_SUCCESS';
const READ_NOTICE_FAILURE = 'notice/READ_NOTICE_FAILURE';
const UNLOAD_NOTICE = 'notice/UNLOAD_NOTICE';

export const readNoitce = createAction(READ_NOTICE, (id) => id);
export const unloadNotice = createAction(UNLOAD_NOTICE);

const readPostSaga = createRequestSaga(READ_NOTICE, noticeAPI.readeNotice);

export function* noticeSaga() {
  yield takeLatest(READ_NOTICE, readPostSaga);
}

const initialState = {
  post: null,
  error: null,
};

const notice = handleActions(
  {
    [READ_NOTICE_SUCCESS]: (state, { payload: notice }) => ({
      ...state,
      notice,
    }),
    [READ_NOTICE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_NOTICE]: () => initialState,
  },
  initialState,
);

export default notice;
