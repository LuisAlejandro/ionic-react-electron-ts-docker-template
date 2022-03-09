import { takeLatest, call, put } from 'redux-saga/effects';

import { Actions } from './constants';
import { userService } from './services';
import { userActions, alertActions } from './actions';


function* userDetailsRequestSaga(action: any) {
  try {
    const userDetails: Response = yield call(userService.getUserDetails,
                                             action.payLoad.email,
                                             action.payLoad.token);
    yield put(userActions.userDetailsSuccess({ userDetails }));
  } catch (err: any) {
    yield put(alertActions.setAlert({
      alertMessage: err.message,
    }));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield takeLatest(Actions.USER_DETAILS_REQUEST, userDetailsRequestSaga);
}
