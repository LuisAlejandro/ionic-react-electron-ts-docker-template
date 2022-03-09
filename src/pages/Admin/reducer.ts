import produce, { Draft } from 'immer';

import { ActionTags } from 'src/shared/common/types';
import { userDataInitialValues } from 'src/shared/common/values';

import { Actions } from './constants';
import { SubState, ActionType } from './types';
import { adminOrganizationsInitialValues, adminRolesInitialValues } from './schemas';


// The initial state of the App
export const initialState: SubState = {
  alertMessage: '',
  userData: userDataInitialValues,
  entitiesList: adminOrganizationsInitialValues,
  organizationsList: adminOrganizationsInitialValues,
  rolesList: adminRolesInitialValues,
};

export const reduceItems = (state: Draft<SubState>, action: ActionTags<ActionType, SubState>) => {
  switch (action.type) {
    case Actions.SET_ALERT: {
      state.alertMessage = action.payLoad.alertMessage;
      return state;
    }
    case Actions.ORGANIZATIONS_REQUEST: {
      return state;
    }
    case Actions.ORGANIZATIONS_SUCCESS: {
      state.organizationsList = action.payLoad.organizationsList;
      return state;
    }
    case Actions.ROLES_REQUEST: {
      return state;
    }
    case Actions.ROLES_SUCCESS: {
      state.rolesList = action.payLoad.rolesList;
      return state;
    }
    case Actions.ENTITIES_REQUEST: {
      return state;
    }
    case Actions.ENTITIES_SUCCESS: {
      state.entitiesList = action.payLoad.entitiesList;
      return state;
    }
    case Actions.CREATE_ENTITIES_REQUEST: {
      return state;
    }
    case Actions.CREATE_ENTITIES_SUCCESS: {
      state.entitiesList.unshift(action.payLoad.createdEntity);
      return state;
    }
    case Actions.UPDATE_ENTITIES_REQUEST: {
      return state;
    }
    case Actions.UPDATE_ENTITIES_SUCCESS: {
      if (!(state.entitiesList && state.entitiesList.length != 0)) return;
      const updatedIndex = state.entitiesList.findIndex(p => p.id == action.payLoad.updatedEntity.id);
      state.entitiesList[updatedIndex] = action.payLoad.updatedEntity;
      return state;
    }
    case Actions.DELETE_ENTITIES_REQUEST: {
      return state;
    }
    case Actions.DELETE_ENTITIES_SUCCESS: {
      if (!(state.entitiesList && state.entitiesList.length != 0)) return;
      const deletedIndex = state.entitiesList.findIndex(p => p.id == action.payLoad.deletedEntity.id);
      state.entitiesList.splice(deletedIndex, 1);
      return state;
    }
    default: {
      return state;
    }
  }
}

export default (state: SubState = initialState, action: ActionTags<ActionType, SubState>) =>
  produce(state, (draft) => reduceItems(draft, action));
