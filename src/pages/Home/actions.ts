import { ActionTags } from 'src/shared/common/types';

import { Actions } from './constants';
import { ActionType } from './types';


function setAlert<T>(payLoad: T): ActionTags<ActionType, T>{
  return {
    type: Actions.SET_ALERT,
    payLoad
  };
}

function userDetailsRequest<T>(payLoad: T): ActionTags<ActionType, T>{
  return {
    type: Actions.USER_DETAILS_REQUEST,
    payLoad
  };
}

function userDetailsSuccess<T>(payLoad: T): ActionTags<ActionType, T>{
  return {
    type: Actions.USER_DETAILS_SUCCESS,
    payLoad
  };
}

export const alertActions = {
  setAlert,
};

export const userActions = {
  userDetailsRequest,
  userDetailsSuccess,
};
