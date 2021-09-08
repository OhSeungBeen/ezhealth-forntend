import { createAction, handleActions } from 'redux-actions';
import Login from '../pages/login';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

export const startLoadingAction = createAction(
  START_LOADING,
  (requestType) => requestType,
);

export const finishLoadingAction = createAction(
  FINISH_LOADING,
  (requestType) => requestType,
);

const initialSate = {};

const loading = handleActions(
  {
    [START_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: true,
    }),
    [FINISH_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: false,
    }),
  },
  initialSate,
);

export default loading;
