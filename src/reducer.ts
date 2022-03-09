/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers, Reducer } from 'redux';
import { connectRouter } from 'connected-react-router';

import { InjectedReducers } from 'src/shared/common/types';

import history from './baseplate/history';


/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers: InjectedReducers = {}): Reducer {
  return combineReducers({
    router: connectRouter(history),
    ...injectedReducers,
  });
}