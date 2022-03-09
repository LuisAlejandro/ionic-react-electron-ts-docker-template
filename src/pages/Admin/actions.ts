import { ActionTags } from 'src/shared/common/types';

import { Actions } from './constants';
import { ActionType } from './types';


function setAlert<T>(payLoad: T): ActionTags<ActionType, T>{
  return {
    type: Actions.SET_ALERT,
    payLoad
  };
}

function getOrganizationsRequest<T>(payLoad: T): ActionTags<ActionType, T>{
  return {
    type: Actions.ORGANIZATIONS_REQUEST,
    payLoad
  };
}

function getOrganizationsSuccess<T>(payLoad: T): ActionTags<ActionType, T>{
  return {
    type: Actions.ORGANIZATIONS_SUCCESS,
    payLoad
  };
}

function getRolesRequest<T>(payLoad: T): ActionTags<ActionType, T>{
  return {
    type: Actions.ROLES_REQUEST,
    payLoad
  };
}

function getRolesSuccess<T>(payLoad: T): ActionTags<ActionType, T>{
  return {
    type: Actions.ROLES_SUCCESS,
    payLoad
  };
}

function getEntitiesRequest<T>(payLoad: T): ActionTags<ActionType, T>{
  return {
    type: Actions.ENTITIES_REQUEST,
    payLoad
  };
}

function getEntitiesSuccess<T>(payLoad: T): ActionTags<ActionType, T>{
  return {
    type: Actions.ENTITIES_SUCCESS,
    payLoad
  };
}

function createEntitiesSuccess<T>(payLoad: T): ActionTags<ActionType, T>{
  return {
    type: Actions.CREATE_ENTITIES_SUCCESS,
    payLoad
  };
}

function createEntitiesRequest<T>(payLoad: T): ActionTags<ActionType, T>{
  return {
    type: Actions.CREATE_ENTITIES_REQUEST,
    payLoad
  };
}

function updateEntitiesSuccess<T>(payLoad: T): ActionTags<ActionType, T>{
  return {
    type: Actions.UPDATE_ENTITIES_SUCCESS,
    payLoad
  };
}

function updateEntitiesRequest<T>(payLoad: T): ActionTags<ActionType, T>{
  return {
    type: Actions.UPDATE_ENTITIES_REQUEST,
    payLoad
  };
}

function deleteEntitiesSuccess<T>(payLoad: T): ActionTags<ActionType, T>{
  return {
    type: Actions.DELETE_ENTITIES_SUCCESS,
    payLoad
  };
}

function deleteEntitiesRequest<T>(payLoad: T): ActionTags<ActionType, T>{
  return {
    type: Actions.DELETE_ENTITIES_REQUEST,
    payLoad
  };
}

export const alertActions = {
  setAlert,
};

export const adminActions = {
  getOrganizationsRequest,
  getOrganizationsSuccess,
  getRolesRequest,
  getRolesSuccess,
  getEntitiesRequest,
  getEntitiesSuccess,
  createEntitiesRequest,
  createEntitiesSuccess,
  updateEntitiesRequest,
  updateEntitiesSuccess,
  deleteEntitiesRequest,
  deleteEntitiesSuccess,
};
