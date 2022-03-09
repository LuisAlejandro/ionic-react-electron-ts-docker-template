import React, { memo, useState, useEffect } from 'react';
import {
  IonRow,
  IonCard,
  IonTitle,
  IonToast,
  IonIcon,
  IonFab,
  IonFabButton,
} from '@ionic/react';
import {
  add,
} from 'ionicons/icons';
import { connect } from 'react-redux';
import { compose, Dispatch, Action } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';

import injector from 'src/baseplate/injector';
import { EProps } from 'src/shared/common/types';
import AdminTables from 'src/components/AdminTables/Loadable';
import AdminModal from 'src/components/AdminModal/Loadable';
import Page from 'src/components/Page/Loadable';

import {
  makeSelectorAlertMessage,
  makeSelectorUserData,
  makeSelectorEntitiesList,
  makeSelectorOrganizationsList,
  makeSelectorRolesList
} from './selectors';
import { alertActions, adminActions } from './actions';
import { NameSpace } from './constants';
import reducer from './reducer';
import saga from './saga';
import {
  InferMappedProps,
  SubState,
  AdminEntityType,
  AdminOrganizationType,
  AdminCreateUserType
} from './types';
import {
  adminOrganizationInitialValues,
  adminCreateUserInitialValues,
} from './schemas';
import style from './style.module.scss';


const Admin: React.FC<InferMappedProps> = ({ eProps, ...props}: InferMappedProps) => {

  const {
    setAlertMessage,
    getOrganizations,
    getRoles,
    getEntities,
    createEntities,
    updateEntities,
    deleteEntities
  } = eProps;
  const {
    userData,
    entitiesList,
    organizationsList,
    rolesList,
    alertMessage
  } = props;

  const { type } = useParams<{ type: string }>();

  const {
    title,
    initialValues,
  } = type == 'organizations' ? {
    title: 'Organizaciones',
    initialValues: adminOrganizationInitialValues as AdminOrganizationType,
  } : type == 'roles' ? {
    title: 'Materiales',
    initialValues: adminMaterialInitialValues as AdminMaterialType,
  } : type == 'permissions' ? {
    title: 'Materiales',
    initialValues: adminMaterialInitialValues as AdminMaterialType,
  } : {
    title: 'Usuarios',
    initialValues: adminCreateUserInitialValues as AdminCreateUserType,
  };

  const [ modalData, setModalData ] = useState<AdminEntityType>(initialValues);
  const [ showModal, setShowModal] = useState<boolean>(false);
  const [ showToast, setShowToast ] = useState<boolean>(false);

  if (!title) return (<></>);

  const refreshEntities = () => {
    if (!(userData && userData.email && userData.token)) return;
    getEntities(type, userData.email, userData.token);
  }

  useEffect(() => {
    refreshEntities();
    if (userData && userData.email && userData.token) {
      if (type == 'users') {
        getRoles(userData.email, userData.token);
      }
      if (type != 'organizations') {
        getOrganizations(userData.email, userData.token);
      }
    };
  }, [userData, type]);

  useEffect(() => {
    if (!alertMessage) return;
    setShowToast(true);
  }, [alertMessage]);

  return (
    <>
      <Page className={style['admin-page']}>
        <IonRow>
          <IonTitle color="primary">{title}</IonTitle>
          <IonFab vertical="bottom" horizontal="end">
            <IonFabButton color="primary"
                          onClick={() => {
                            setModalData(initialValues);
                            setShowModal(true);
                          }}>
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>
        </IonRow>
        <IonRow>
          <IonCard className={style['admin-card']}>
            <AdminTables
              type={type}
              data={entitiesList}
              refreshEntities={refreshEntities}
              showModal={(data: AdminEntityType) => {
                setModalData(data);
                setShowModal(true);
              }}
              deleteEntities={(id: string) => {
                if (!(userData && userData.email && userData.token)) return;
                deleteEntities(type, userData.email, userData.token, id);
              }}
            />
            <AdminModal
              type={type}
              data={modalData}
              isOpen={showModal}
              setIsOpen={setShowModal}
              setAlertMessage={setAlertMessage}
              organizationsList={organizationsList}
              rolesList={rolesList}
              createEntities={(values: AdminEntityType) => {
                if (!(userData && userData.email && userData.token)) return;
                createEntities(type, userData.email, userData.token, values);
              }}
              updateEntities={(id: string, values: AdminEntityType) => {
                if (!(userData && userData.email && userData.token)) return;
                updateEntities(type, userData.email, userData.token, id, values);
              }}
            />
          </IonCard>
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
        }]}
      />
    </>
  );
};

/** @returns {object} Contains state props from selectors */
export const mapStateToProps = createStructuredSelector<SubState, SubState>({
  alertMessage: makeSelectorAlertMessage(),
  userData: makeSelectorUserData(),
  entitiesList: makeSelectorEntitiesList(),
  organizationsList: makeSelectorOrganizationsList(),
  rolesList: makeSelectorRolesList(),
});

/** @returns {object} Contains dispatchable props */
export const mapDispatchToProps = (dispatch: Dispatch<Action>): EProps => {
  return {
    // eProps - Emitter proptypes thats binds to dispatch
    eProps: {
      setAlertMessage: (alertMessage: string) =>
        dispatch(alertActions.setAlert({ alertMessage })),
      getOrganizations: (email: string, token: string) =>
        dispatch(adminActions.getOrganizationsRequest({ email, token })),
      getRoles: (email: string, token: string) =>
        dispatch(adminActions.getRolesRequest({ email, token })),
      getEntities: (type: string, email: string, token: string) =>
        dispatch(adminActions.getEntitiesRequest({ type, email, token })),
      createEntities: (type: string, email: string, token: string, values: AdminEntityType) =>
        dispatch(adminActions.createEntitiesRequest({ type, email, token, values })),
      updateEntities: (type: string, email: string, token: string, id: string, values: AdminEntityType) =>
        dispatch(adminActions.updateEntitiesRequest({ type, email, token, id, values })),
      deleteEntities: (type: string, email: string, token: string, id: string) =>
        dispatch(adminActions.deleteEntitiesRequest({ type, email, token, id })),
    }
  };
}

/**
 * Injects prop and saga bindings done via
 * useInjectReducer & useInjectSaga
 */
const withInjectedMode = injector(
  Admin,
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
