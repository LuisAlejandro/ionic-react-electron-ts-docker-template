import { ActionTags } from 'src/shared/common/types';

import { Actions } from './constants';
import { ActionType } from './types';


function setAlert<T>(payLoad: T): ActionTags<ActionType, T>{
  return {
    type: Actions.SET_ALERT,
    payLoad
  };
}

function userLoginFormSubmit<T>(payLoad: T): ActionTags<ActionType, T>{
  return {
    type: Actions.USER_LOGIN_FORM_SUBMIT,
    payLoad
  };
}

function userLoginRequest<T>(payLoad: T): ActionTags<ActionType, T>{
  return {
    type: Actions.USER_LOGIN_REQUEST,
    payLoad
  };
}

function userLoginSuccess<T>(payLoad: T): ActionTags<ActionType, T>{
  return {
    type: Actions.USER_LOGIN_SUCCESS,
    payLoad
  };
}

function userLoginFailure<T>(payLoad: T): ActionTags<ActionType, T>{
  return {
    type: Actions.USER_LOGIN_FAILURE,
    payLoad
  };
}

export const alertActions = {
  setAlert,
};

export const userActions = {
  userLoginFormSubmit,
  userLoginRequest,
  userLoginSuccess,
  userLoginFailure
};
