import * as yup from 'yup';

import {
  organizationDetailsSchema,
  userDetailsSchema,
  roleDetailsSchema,
  permissionDetailsSchema,
  requiredIdSchema
} from 'src/shared/common/schemas';

import { Constants } from './constants';


// Schemas
// ------------------------------------------------------------------------------------------------
export const adminOrganizationSchema = organizationDetailsSchema
  .omit(Constants.OrganizationsModelExcludes as any);

export const adminRoleSchema = roleDetailsSchema
  .omit(Constants.RolesModelExcludes as any);

export const adminPermissionSchema = permissionDetailsSchema
  .omit(Constants.PermissionsModelExcludes as any);

export const adminCreateUserSchema = userDetailsSchema
  .omit(Constants.UsersModelExcludes as any)
  .shape({ organizationId: requiredIdSchema });

export const adminUpdateUserSchema = userDetailsSchema
  .omit((Constants.UsersModelExcludes as any).concat(['password', 'password2']))
  .shape({ organizationId: requiredIdSchema });

export const adminOrganizationsSchema = yup.array(adminOrganizationSchema).default([]);
export const adminRolesSchema = yup.array(adminRoleSchema).default([]);
export const adminPermissionsSchema = yup.array(adminPermissionSchema).default([]);
export const adminCreateUsersSchema = yup.array(adminCreateUserSchema).default([]);
export const adminUpdateUsersSchema = yup.array(adminUpdateUserSchema).default([]);


// Initial values
// ------------------------------------------------------------------------------------------------
export const adminOrganizationInitialValues = adminOrganizationSchema.getDefault();
export const adminRoleInitialValues = adminRoleSchema.getDefault();
export const adminPermissionInitialValues = adminPermissionSchema.getDefault();
export const adminCreateUserInitialValues = adminCreateUserSchema.getDefault();
export const adminUpdateUserInitialValues = adminUpdateUserSchema.getDefault();

export const adminOrganizationsInitialValues = adminOrganizationsSchema.getDefault();
export const adminRolesInitialValues = adminRolesSchema.getDefault();
export const adminPermissionsInitialValues = adminPermissionsSchema.getDefault();
export const adminCreateUsersInitialValues = adminCreateUsersSchema.getDefault();
export const adminUpdateUsersInitialValues = adminUpdateUsersSchema.getDefault();
