import {
  userDataDetailsSchema,
  organizationDetailsSchema,
  organizationsSchema,
  roleDetailsSchema,
  rolesSchema,
  userDetailsSchema,
  authDataDetailsSchema,
  loginFormSchema
} from './schemas';


export const organizationDetailsInitialValues = organizationDetailsSchema.getDefault();
export const organizationsInitialValues = organizationsSchema.getDefault();

export const roleDetailsInitialValues = roleDetailsSchema.getDefault();
export const rolesInitialValues = rolesSchema.getDefault();

export const userDetailsInitialValues = userDetailsSchema.getDefault();

export const authDataInitialValues = authDataDetailsSchema.getDefault();
export const userDataInitialValues = userDataDetailsSchema.getDefault();

export const loginFormInitialValues = loginFormSchema.getDefault();
