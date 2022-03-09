import produce, { Draft } from 'immer';

import { ActionTags } from 'src/shared/common/types';
import { userDataInitialValues } from 'src/shared/common/values';

import { Actions } from './constants';
import { SubState, ActionType } from './types';
import { homeUserInitialValues } from './schemas';


// The initial state of the App
export const initialState: SubState = {
  alertMessage: '',
  userData: userDataInitialValues,
  userDetails: homeUserInitialValues,
};

export const reduceItems = (state: Draft<SubState>, action: ActionTags<ActionType, SubState>) => {
  switch (action.type) {
    case Actions.SET_ALERT: {
      state.alertMessage = action.payLoad.alertMessage;
      return state;
    }
    case Actions.USER_DETAILS_REQUEST: {
      return state;
    }
    case Actions.USER_DETAILS_SUCCESS: {
      state.userDetails = action.payLoad.userDetails;
      return state;
    }
    default: {
      return state;
    }
  }
}

export default (state: SubState = initialState, action: ActionTags<ActionType, SubState>) =>
  produce(state, (draft) => reduceItems(draft, action));
