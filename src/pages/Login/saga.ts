import { takeLatest, call, put } from 'redux-saga/effects';

import { Actions } from './constants';
import { userService } from './services';
import { userActions, alertActions } from './actions';


function* userLoginFormSubmitSaga(action: any) {
  try {
    yield put(userActions.userLoginRequest({
      userLoggingIn: true
    }));
    yield call(userService.login,
              action.payLoad.email,
              action.payLoad.password);
    yield put(alertActions.setAlert({
      alertMessage: 'Login exitoso',
    }));
    yield put(userActions.userLoginSuccess({
      userLoggedIn: true,
    }));
    location.href = '/home';
  } catch (err: any) {
    yield put(alertActions.setAlert({
      alertMessage: err.message,
    }));
    yield put(userActions.userLoginFailure({
      userLoggingIn: false
    }));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield takeLatest(Actions.USER_LOGIN_FORM_SUBMIT, userLoginFormSubmitSaga);
};
