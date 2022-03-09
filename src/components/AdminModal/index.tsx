import React, { useEffect } from 'react';
import {
  IonIcon,
  IonCard,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonModal,
  IonTitle,
  IonButtons,
  IonContent,
  IonCardContent,
  IonToolbar,
  IonLabel,
} from '@ionic/react';
import {
  peopleCircleSharp,
  locationSharp,
  personSharp,
  pulseSharp,
  phonePortraitSharp,
  footstepsSharp,
  cubeSharp,
  closeSharp,
  saveSharp,
  checkmarkSharp,
  peopleSharp,
} from 'ionicons/icons';
import {
  useForm,
  FieldErrors,
  UnpackNestedValue,
} from 'react-hook-form';
import lodashMerge from 'lodash/merge';
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  adminOrganizationSchema,
  adminMaterialSchema,
  adminTerminationSchema,
  adminDeviceSchema,
  adminDoctorSchema,
  adminDeliveryAddressSchema,
  adminPickupAddressSchema,
  adminPatientSchema,
  adminCreateUserSchema,
  adminUpdateUserSchema,
  adminOrganizationInitialValues,
  adminMaterialInitialValues,
  adminTerminationInitialValues,
  adminDeviceInitialValues,
  adminDoctorInitialValues,
  adminPickupAddressInitialValues,
  adminDeliveryAddressInitialValues,
  adminPatientInitialValues,
  adminCreateUserInitialValues,
  adminUpdateUserInitialValues,
} from 'src/pages/Admin/schemas';
import {
  AdminCreateUserType,
  AdminDeliveryAddressType,
  AdminDeviceType,
  AdminDoctorType,
  AdminEntityType,
  AdminMaterialType,
  AdminOrganizationType,
  AdminPatientType,
  AdminPickupAddressType,
  AdminRoleType,
  AdminTerminationType,
  AdminUpdateUserType,
} from 'src/pages/Admin/types';
import { flattenObject } from 'src/shared/common/helpers';
import { createRequestMuiTheme } from 'src/shared/common/themes';
import { userDataInitialValues } from 'src/shared/common/values';

import { PickupAddressesAdminModalContent } from './entities/pickupaddresses';
import { OrganizationsAdminModalContent } from './entities/organizations';
import { MaterialsAdminModalContent } from './entities/materials';
import { TerminationsAdminModalContent } from './entities/terminations';
import { DevicesAdminModalContent } from './entities/devices';
import { DoctorsAdminModalContent } from './entities/doctors';
import { PatientsAdminModalContent } from './entities/patients';
import { UsersAdminModalContent } from './entities/users';

import style from './style.module.scss';



declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}



type SubState = {
  type: string,
  data: AdminEntityType,
  isOpen: boolean,
  setIsOpen: (x: boolean) => void,
  createEntities: (values: AdminEntityType) => void,
  updateEntities: (id: string, values: AdminEntityType) => void,
  setAlertMessage: (alertMessage: string) => void,
  organizationsList: AdminOrganizationType[],
  rolesList: AdminRoleType[],
};

const AdminModal = (props: SubState) => {

  const {
    type,
    data,
    isOpen,
    setIsOpen,
    createEntities,
    updateEntities,
    setAlertMessage,
    organizationsList,
    rolesList,
  } = props;

  const isDelivery = (data && 'use' in data) ? false : true;
  const isCreate = !(data && data.id && data.id != '');
    
  const {
    title,
    icon,
    ModalContent,
    schema,
    initialValues,
  }: {
    title: string,
    icon: string,
    ModalContent: (x: any) => JSX.Element,
    schema: any,
    initialValues: AdminEntityType,
  } = type == 'organizations' ? {
    title: 'Organizaciones',
    icon: peopleCircleSharp,
    ModalContent: OrganizationsAdminModalContent,
    schema: adminOrganizationSchema,
    initialValues: adminOrganizationInitialValues as AdminOrganizationType,
  } : type == 'materials' ? {
    title: 'Materiales',
    icon: cubeSharp,
    ModalContent: MaterialsAdminModalContent,
    schema: adminMaterialSchema,
    initialValues: adminMaterialInitialValues as AdminMaterialType,
  } : type == 'terminations' ? {
    title: 'Terminaciones',
    icon: footstepsSharp,
    ModalContent: TerminationsAdminModalContent,
    schema: adminTerminationSchema,
    initialValues: adminTerminationInitialValues as AdminTerminationType,
  } : type == 'devices' ? {
    title: 'Equipos',
    icon: phonePortraitSharp,
    ModalContent: DevicesAdminModalContent,
    schema: adminDeviceSchema,
    initialValues: adminDeviceInitialValues as AdminDeviceType,
  } : type == 'doctors' ? {
    title: 'Doctores',
    icon: pulseSharp,
    ModalContent: DoctorsAdminModalContent,
    schema: adminDoctorSchema,
    initialValues: adminDoctorInitialValues as AdminDoctorType,
  } : type == 'pickupaddresses' ? {
    title: isDelivery ? 'Direcciones de entrega' : 'Direcciones de retiro',
    icon: locationSharp,
    ModalContent: PickupAddressesAdminModalContent,
    schema: isDelivery ?
      adminDeliveryAddressSchema : adminPickupAddressSchema,
    initialValues: isDelivery ?
      adminDeliveryAddressInitialValues as AdminDeliveryAddressType :
      adminPickupAddressInitialValues as AdminPickupAddressType,
  } : type == 'patients' ? {
    title: 'Pacientes',
    icon: peopleSharp,
    ModalContent: PatientsAdminModalContent,
    schema: adminPatientSchema,
    initialValues: adminPatientInitialValues as AdminPatientType,
  } : {
    title: 'Usuarios',
    icon: personSharp,
    ModalContent: UsersAdminModalContent,
    schema: isCreate ?
      adminUpdateUserSchema : adminCreateUserSchema,
    initialValues: isCreate ?
      adminUpdateUserInitialValues as AdminUpdateUserType :
      adminCreateUserInitialValues as AdminCreateUserType,
  };

  if (userDataInitialValues.orgName != 'Soleit') {
    if ('organizationId' in initialValues) {
      initialValues.organizationId = userDataInitialValues.orgId;
    }
    if ('organizationId' in data) {
      data.organizationId = userDataInitialValues.orgId;
    }
  }

  const {
    handleSubmit,
    control,
    reset,
    trigger
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema.omit(['organization', 'role'])),
  });

  useEffect(() => {
    if (isCreate) {
      reset(lodashMerge({}, initialValues, data));
    } else {
      reset(lodashMerge({}, data));
    }
  }, [data]);

  const handleFormSubmit = (event: React.BaseSyntheticEvent) => {
    trigger();
    handleSubmit(onValidSubmit, onInvalidSubmit)(event);
  };

  const onValidSubmit = (values: UnpackNestedValue<AdminEntityType>, event?: React.BaseSyntheticEvent) => {
    if (isCreate) {
      createEntities(values);
    } else {
      updateEntities(data.id, values);
    }
    reset();
    setIsOpen(false);
    return;
  };

  const onInvalidSubmit = (errors: FieldErrors<AdminEntityType>, event?: React.BaseSyntheticEvent) => {
    const flattenedErrors = flattenObject(errors);
    const firstError = Object.keys(flattenedErrors).filter((e) => e.endsWith('.message'))[0];
    setAlertMessage(`Error: ${flattenedErrors[firstError]}`);
  };

  return (
    <IonModal backdropDismiss={false} isOpen={isOpen} cssClass={style['admin-modal']}>
      <IonContent className={style['admin-modal-content']}>
        <IonGrid>
          <IonRow class="ion-float-right">
            <IonButtons>
              <IonButton slot="end" fill="clear"
                         size="small" color="gray70"
                         onClick={() => {
                          reset();
                          setIsOpen(false);
                         }}>
                <IonIcon icon={closeSharp} />
              </IonButton>
            </IonButtons>
          </IonRow>
          <IonRow class="ion-no-padding ion-margin-horizontal">
            <IonToolbar color="translucent">
              <IonIcon size="default" slot="start" color="primary" icon={icon} />
              <IonTitle size="small" slot="start">{title}</IonTitle>
            </IonToolbar>
          </IonRow>
          <IonRow>
            <IonCol size="24">
              <IonCard class="ion-no-padding ion-no-margin">
                <IonCardContent className="ion-padding">
                  <form>
                    <StyledEngineProvider injectFirst>
                      <ThemeProvider theme={createRequestMuiTheme}>
                        <ModalContent control={control} isCreate={isCreate} setAlertMessage={setAlertMessage}
                                      organizationsList={organizationsList} rolesList={rolesList} isDelivery={isDelivery}>
                          <IonCol size="12">
                            <IonButtons class="ion-justify-content-start">
                              <IonButton class="ion-text-capitalize" fill="solid"
                                         expand="block" color="igray50"
                                         onClick={() => {
                                           reset();
                                           setIsOpen(false);
                                         }}>
                                <IonIcon slot="start" icon={closeSharp} />
                                <IonLabel>Cancelar</IonLabel>
                              </IonButton>
                              <IonButton class="ion-text-capitalize" fill="solid"
                                         expand="block" color="igray30"
                                         onClick={() => {
                                           reset();
                                         }}>
                                <IonLabel>Limpiar</IonLabel>
                              </IonButton>
                            </IonButtons>
                          </IonCol>
                          <IonCol size="12">
                            <IonButtons class="ion-justify-content-end">
                              <IonButton class="ion-text-capitalize" fill="solid"
                                         expand="block" color="iprimary" onClick={handleFormSubmit}>
                                <IonLabel>{isCreate ? ('Añadir') : ('Guardar')}</IonLabel>
                                <IonIcon slot="start" icon={isCreate ? checkmarkSharp : saveSharp} />
                              </IonButton>
                            </IonButtons>
                          </IonCol>
                        </ModalContent>
                      </ThemeProvider>
                    </StyledEngineProvider>
                  </form>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default AdminModal;
