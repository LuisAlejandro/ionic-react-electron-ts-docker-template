import React, { memo, useEffect, useState } from 'react';
import {
  IonIcon,
  IonRow,
  IonCol,
  IonGrid,
  IonLabel,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonToast
} from '@ionic/react';
import {
  eyeOutline,
  closeCircleOutline,
  addCircleOutline,
  createOutline
} from 'ionicons/icons';
import { connect } from 'react-redux';
import { compose, Dispatch, Action } from 'redux';
import { createStructuredSelector } from 'reselect';

import injector from 'src/baseplate/injector';
import { EProps } from 'src/shared/common/types';
import Page from 'src/components/Page/Loadable';
import { userDataInitialValues } from 'src/shared/common/values';
import AvatarImg from 'src/assets/images/png/avatar.png';
import RequestsTable from 'src/components/RequestsTable/Loadable';

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


const Profile: React.FC<InferMappedProps> = ({ eProps, ...props }: InferMappedProps) => {

  const { getUserDetails, setAlertMessage } = eProps;
  const { userData, userDetails, alertMessage } = props;

  const [ showToast, setShowToast ] = useState<boolean>(false);

  const refreshUserDetails = () => {
    if (!(userData && userData.email && userData.token)) return;
    getUserDetails(userData.email, userData.token);
  }

  useEffect(() => {
    refreshUserDetails();
  }, [userData]);

  useEffect(() => {
    if (!alertMessage) return;
    setShowToast(true);
  }, [alertMessage]);

  return (
    <>
      <Page className={style['profile']}>
        <IonRow>
          <IonCol size="8" size-sm="6" size-md="4" size-xl="3"
                  className={style['drawer-panel']} class="ion-no-padding">
            <IonGrid class="ion-no-padding">
              <IonRow class="ion-padding ion-no-margin">
                <IonLabel class="ion-no-margin ion-no-padding" color="black">
                  <img src={userDataInitialValues.avatar || AvatarImg} />
                </IonLabel>
              </IonRow>
              <IonRow class="ion-padding-horizontal ion-no-margin">
                <IonLabel className={style['name']} class="ion-no-margin ion-no-padding name" color="black">
                  {`${userDataInitialValues.firstName} ${userDataInitialValues.lastName}`}
                </IonLabel>
              </IonRow>
              <IonRow class="ion-padding-horizontal ion-no-margin">
                <IonLabel className={style['subtext']} class="ion-no-margin ion-no-padding" color="gray50">
                  {userDataInitialValues.role}
                </IonLabel>
              </IonRow>
              <IonRow class="ion-padding-horizontal ion-no-margin">
                <IonLabel className={style['subtext']} class="ion-no-margin ion-no-padding" color="gray50">
                  {userDataInitialValues.orgName}
                </IonLabel>
              </IonRow>
            </IonGrid>
          </IonCol>
          <IonCol size="16" size-sm="18" size-md="20" size-xl="21"
                  className={style['content-panel']} class="ion-no-padding">
            <IonRow>
              <IonCol size="24">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle color="primary">Solicitudes</IonCardTitle>
                    <IonCardSubtitle color="gray30">Solicitudes realizadas por este usuario</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent class="ion-padding">
                    <RequestsTable mode="minimal" data={userDetails.requests} />
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="24">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle color="primary">Privilegios</IonCardTitle>
                    <IonCardSubtitle color="gray30">Listado de privilegios atribuídos a este usuario</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent class="ion-padding">
                    {userDataInitialValues.permissions && userDataInitialValues.permissions.length > 0 && (
                      userDataInitialValues.permissions.map((permission: string) => {
                        let chipIcon;
                        const verb = permission.split(' ')[0];
                        switch (verb) {
                          default:
                          case 'view':
                            chipIcon = eyeOutline;
                            break;
                          case 'create':
                            chipIcon = addCircleOutline;
                            break;
                          case 'edit':
                            chipIcon = createOutline;
                            break;
                          case 'destroy':
                            chipIcon = closeCircleOutline;
                            break;
                        }
                        return (
                          <IonChip className={style['card-chip']}>
                            <IonIcon icon={chipIcon} />
                            <IonLabel>{permission}</IonLabel>
                          </IonChip>
                        );
                      })
                    )}
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonCol>
        </IonRow>
      </Page>
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
  Profile,
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
