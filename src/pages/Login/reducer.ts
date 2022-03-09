import produce, { Draft } from 'immer';

import { ActionTags } from 'src/shared/common/types';

import { Actions } from './constants';
import { SubState, ActionType } from './types';


// The initial state of the App
export const initialState: SubState = {
  alertMessage: '',
  userLoggingIn: false,
  userLoggedIn: false,
};

export const reduceItems = (state: Draft<SubState>, action: ActionTags<ActionType, SubState>) => {
  switch (action.type) {
    case Actions.SET_ALERT: {
      state.alertMessage = action.payLoad.alertMessage;
      return state;
    }
    case Actions.USER_LOGIN_FORM_SUBMIT: {
      return state;
    }
    case Actions.USER_LOGIN_REQUEST: {
      state.userLoggingIn = action.payLoad.userLoggingIn;
      return state;
    }
    case Actions.USER_LOGIN_SUCCESS: {
      state.userLoggedIn = action.payLoad.userLoggedIn;
      return state;
    }
    case Actions.USER_LOGIN_FAILURE: {
      state.userLoggingIn = action.payLoad.userLoggingIn;
      return state;
    }
    case Actions.USER_LOGOUT: {
      return state;
    }
    default: {
      return state;
    }
  }
}

export default (state: SubState = initialState, action: ActionTags<ActionType, SubState>) =>
  produce(state, (draft) => reduceItems(draft, action));
