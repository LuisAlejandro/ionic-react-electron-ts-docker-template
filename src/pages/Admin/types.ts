/**
 * Type defined inside this container
*/
import { Except } from 'type-fest';

import {
  OrganizationType,
  RoleType,
  MaterialType,
  TerminationType,
  DeviceType,
  DoctorType,
  PatientType,
  PickupAddressType,
  DeliveryAddressType,
  UserType,
  UserDataType
} from 'src/shared/common/types';

import { mapDispatchToProps, mapStateToProps } from './index';
import { Actions, Constants } from './constants';


export type AdminRoleType = Except<RoleType, typeof Constants.RolesModelExcludes[number]>;
export type AdminOrganizationType = Except<OrganizationType, typeof Constants.OrganizationsModelExcludes[number]>;
export type AdminMaterialType = Except<MaterialType, typeof Constants.MaterialsModelExcludes[number]>;
export type AdminTerminationType = Except<TerminationType, typeof Constants.TerminationsModelExcludes[number]>;
export type AdminDeviceType = Except<DeviceType, typeof Constants.DevicesModelExcludes[number]>;
export type AdminDoctorType = Except<DoctorType, typeof Constants.DoctorsModelExcludes[number]>;
export type AdminPickupAddressType = Except<PickupAddressType, typeof Constants.PickupAddressesModelExcludes[number]>;
export type AdminDeliveryAddressType = Except<DeliveryAddressType, typeof Constants.DeliveryAddressesModelExcludes[number]>;
export type AdminPatientType = Except<PatientType, typeof Constants.PatientsModelExcludes[number]>;
export type AdminCreateUserType = Except<UserType, typeof Constants.UsersModelExcludes[number]>;
export type AdminUpdateUserType = Except<Except<UserType, typeof Constants.UsersModelExcludes[number]>, 'password' | 'password2'>;

export type AdminEntityType = AdminUpdateUserType       |           // users (update)
                              AdminCreateUserType       |           // users (create)
                              AdminDoctorType           |           // doctors
                              AdminTerminationType      |           // terminations
                              AdminOrganizationType     |           // organizations
                              AdminMaterialType         |           // materials
                              AdminDeviceType           |           // devices
                              AdminPickupAddressType    |           // pickupaddresses
                              AdminDeliveryAddressType  |           // deviceaddresses
                              AdminPatientType;                     // patients

export type InferMappedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
export type ActionType = typeof Actions;
export type SubState = {
  alertMessage: string,
  userData: UserDataType,
  entitiesList: AdminEntityType[],
  organizationsList: AdminOrganizationType[],
  rolesList: AdminRoleType[],
  createdEntity?: AdminEntityType,
  updatedEntity?: AdminEntityType,
  deletedEntity?: AdminEntityType,
};
