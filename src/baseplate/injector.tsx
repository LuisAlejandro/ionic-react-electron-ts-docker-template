
import React from 'react';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { Saga } from 'redux-saga';
import { Draft } from 'immer';

/**
 * Injects Reducer and Saga into your functional component
 * @param {ReactComponent} component Functional component to be injected into
 * @param {object} [param1] meta data for key, saga, reducer
 * @param {string} [param1.key] name of the component/container
 * @param {function} [param1.reducer] reducer function for state change
 * @param {function} [param1.saga] saga function for api calls
 */

const Injector = (InjFunComp: React.ComponentType<any>, { key, saga, reducer }: { key: string, saga: Saga, reducer: Draft<any> }) => {
  return (props: any[]) => {
    useInjectReducer({ key, reducer })
    useInjectSaga({ key, saga })
    return <InjFunComp {...props} />;
  }
};

export default Injector;