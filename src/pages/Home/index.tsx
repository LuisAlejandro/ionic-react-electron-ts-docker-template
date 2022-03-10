import React, { memo, useEffect, useState } from 'react';
import {
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonToast
} from '@ionic/react';
import { connect } from 'react-redux';
import { compose, Dispatch, Action } from 'redux';
import { createStructuredSelector } from 'reselect';
import numbro from 'numbro';

import injector from 'src/baseplate/injector';
import { EProps } from 'src/shared/common/types';
import SimpleLineGraph from 'src/components/SimpleLineGraph/Loadable';
import Page from 'src/components/Page/Loadable';

import {
  makeSelectorAlertMessage,
  makeSelectorUserData,
  makeSelectorUserDetails,
} from './selectors';
import { userActions, alertActions } from './actions'
import { NameSpace } from './constants';
import reducer from './reducer';
import saga from './saga';
import { InferMappedProps, SubState } from './types';
import style from './style.module.scss';


const Home: React.FC<InferMappedProps> = ({ eProps, ...props }: InferMappedProps) => {

  const { getUserDetails, setAlertMessage } = eProps;
  const { userData, userDetails, alertMessage } = props;

  const [ showToast, setShowToast ] = useState<boolean>(false);

  useEffect(() => {
    if (!alertMessage) return;
    setShowToast(true);
  }, [alertMessage]);

  useEffect(() => {
    if (!(userData && userData.email && userData.token)) return;
    getUserDetails(userData.email, userData.token);
  }, []);

  return (
    <>
      <Page className={style['home']}>
        <IonRow>
          <IonCol size="12">
            <IonCard>
              <IonCardHeader className="ion-float-left">
                <IonCardTitle color="primary">
                  Ionic React Template
                </IonCardTitle>
                <IonCardSubtitle color="gray30"></IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
          <IonCol size="4">
            <IonCard>
              <IonCardHeader className="ion-float-left">
                <IonCardSubtitle color="gray30">Stat 1</IonCardSubtitle>
                <IonCardTitle color="black">{numbro(0).format('00')}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent className="ion-float-right ion-no-padding">
                <SimpleLineGraph color="#FE2626" data={[1, 5, 3]} />
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="4">
            <IonCard>
              <IonCardHeader className="ion-float-left">
                <IonCardSubtitle color="gray30">Stat 2</IonCardSubtitle>
                <IonCardTitle color="black">{numbro(0).format('00')}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent className="ion-float-right ion-no-padding">
                <SimpleLineGraph color="#10BD85" data={[1, 5, 3]} />
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="4">
            <IonCard>
              <IonCardHeader className="ion-float-left">
                <IonCardSubtitle color="gray30">Stat 3</IonCardSubtitle>
                <IonCardTitle color="black">{numbro(0).format('00')}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent className="ion-float-right ion-no-padding">
                <SimpleLineGraph color="#0057FF" data={[1, 5, 3]} />
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCard className={style['data-table-card']}>
            <IonCardHeader>
              <IonCardTitle color="gray30">
              </IonCardTitle>
            </IonCardHeader>
          </IonCard>
        </IonRow>
        <IonToast
          onDidDismiss={() => {
            setShowToast(false);
            setAlertMessage('');
          }}
          isOpen={showToast && alertMessage != ''}
          message={alertMessage}
          position="top"
          duration={10000}
          translucent={true}
          buttons={[{
            text: 'Cerrar',
            role: 'cancel',
          }]} />
      </Page>
    </>
  );
};


/** @returns {object} Contains state props from selectors */
export const mapStateToProps = createStructuredSelector<SubState, SubState>({
  alertMessage: makeSelectorAlertMessage(),
  userData: makeSelectorUserData(),
  userDetails: makeSelectorUserDetails(),
});

/** @returns {object} Contains dispatchable props */
export const mapDispatchToProps = (dispatch: Dispatch<Action>): EProps => {
  return {
    // eProps - Emitter proptypes thats binds to dispatch
    eProps: {
      setAlertMessage: (alertMessage: string) =>
        dispatch(alertActions.setAlert({ alertMessage })),
      getUserDetails: (email: string, token: string) =>
        dispatch(userActions.userDetailsRequest({ email, token })),
    }
  };
}

/**
 * Injects prop and saga bindings done via
 * useInjectReducer & useInjectSaga
 */
const withInjectedMode = injector(
  Home,
  {
    key: NameSpace,
    reducer,
    saga
  }
);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(withInjectedMode) as React.ComponentType<InferMappedProps>;
