import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {
  createInjectorsEnhancer,
  forceReducerReload
} from 'redux-injectors';
import { routerMiddleware } from 'connected-react-router';
import { History, LocationState } from 'history';

import { createReducer } from './reducer';


export default function configureStore(initialState = {}, history: History<LocationState>) {

  const sagaMiddleware = createSagaMiddleware({});
  const { run: runSaga } = sagaMiddleware;

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
    createInjectorsEnhancer({ runSaga, createReducer }),
  ];

  const store: any = createStore(
    createReducer(),
    initialState,
    compose(...enhancers),
  );

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducer', () => {
      forceReducerReload(store);
    });
  }

  return store;
}
