import { createSelector } from 'reselect';

import { initialState } from './reducer';
import { NameSpace } from './constants';
import { SubState } from './types';


// Branches the page state from the Global context
const pageState = (state: any): SubState => state[NameSpace] || initialState;

const selectorAlertMessage = (ps: any) =>
  createSelector(ps, (substate: SubState): SubState['alertMessage'] => substate.alertMessage);
const selectorUserData = (ps: any) =>
  createSelector(ps, (substate: SubState): SubState['userData'] => substate.userData);
const selectorEntitiesList = (ps: any) =>
  createSelector(ps, (substate: SubState): SubState['entitiesList'] => substate.entitiesList);
const selectorOrganizationsList = (ps: any) =>
  createSelector(ps, (substate: SubState): SubState['organizationsList'] => substate.organizationsList);
const selectorRolesList = (ps: any) =>
  createSelector(ps, (substate: SubState): SubState['rolesList'] => substate.rolesList);

export const makeSelectorAlertMessage = () => selectorAlertMessage(pageState);
export const makeSelectorUserData = () => selectorUserData(pageState);
export const makeSelectorEntitiesList = () => selectorEntitiesList(pageState);
export const makeSelectorOrganizationsList = () => selectorOrganizationsList(pageState);
export const makeSelectorRolesList = () => selectorRolesList(pageState);
