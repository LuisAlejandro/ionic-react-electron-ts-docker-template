/**
 * Type defined inside this container
*/
import { Except } from 'type-fest';

import {
  OrganizationType,
  RoleType,
  UserType,
  UserDataType
} from 'src/shared/common/types';

import { mapDispatchToProps, mapStateToProps } from './index';
import { Actions, Constants } from './constants';


export type AdminRoleType = Except<RoleType, typeof Constants.RolesModelExcludes[number]>;
export type AdminOrganizationType = Except<OrganizationType, typeof Constants.OrganizationsModelExcludes[number]>;
export type AdminCreateUserType = Except<UserType, typeof Constants.UsersModelExcludes[number]>;
export type AdminUpdateUserType = Except<Except<UserType, typeof Constants.UsersModelExcludes[number]>, 'password' | 'password2'>;

export type AdminEntityType = AdminUpdateUserType       |           // users (update)
                              AdminCreateUserType       |           // users (create)
                              AdminOrganizationType     |           // organizations
                              AdminRoleType                         // roles

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
