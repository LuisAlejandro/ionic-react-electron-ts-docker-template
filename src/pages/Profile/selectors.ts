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
const selectorUserDetails = (ps: any) =>
  createSelector(ps, (substate: SubState): SubState['userDetails'] => substate.userDetails);

export const makeSelectorAlertMessage = () => selectorAlertMessage(pageState);
export const makeSelectorUserData = () => selectorUserData(pageState);
export const makeSelectorUserDetails = () => selectorUserDetails(pageState);
