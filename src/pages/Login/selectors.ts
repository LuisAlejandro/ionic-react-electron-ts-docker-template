import { createSelector } from 'reselect';

import { initialState } from './reducer';
import { NameSpace } from './constants';
import { SubState } from './types';


// Branches the page state from the Global context
const pageState = (state: any): SubState => state[NameSpace] || initialState;

const selectorAlertMessage = (ps: any) =>
  createSelector(ps, (substate: SubState): SubState['alertMessage'] => substate.alertMessage);
const selectorUserLoggingIn = (ps: any) =>
  createSelector(ps, (substate: SubState): SubState['userLoggingIn'] => substate.userLoggingIn);
const selectorUserLoggedIn = (ps: any) =>
  createSelector(ps, (substate: SubState): SubState['userLoggedIn'] => substate.userLoggedIn);

export const makeSelectorAlertMessage = () => selectorAlertMessage(pageState);
export const makeSelectorUserLoggingIn = () => selectorUserLoggingIn(pageState);
export const makeSelectorUserLoggedIn = () => selectorUserLoggedIn(pageState);
