import * as yup from 'yup';

import {
  deviceDetailsSchema,
  doctorDetailsSchema,
  materialDetailsSchema,
  organizationDetailsSchema,
  patientDetailsSchema,
  pickupAddressDetailsSchema,
  deliveryAddressDetailsSchema,
  terminationDetailsSchema,
  userDetailsSchema,
  roleDetailsSchema,
  requiredIdSchema
} from 'src/shared/common/schemas';

import { Constants } from './constants';


// Schemas
// ------------------------------------------------------------------------------------------------
export const adminRoleSchema = roleDetailsSchema
  .omit(Constants.RolesModelExcludes as any);

export const adminOrganizationSchema = organizationDetailsSchema
  .omit(Constants.OrganizationsModelExcludes as any);

export const adminMaterialSchema = materialDetailsSchema
  .omit(Constants.MaterialsModelExcludes as any)
  .shape({ organizationId: requiredIdSchema });

export const adminTerminationSchema = terminationDetailsSchema
  .omit(Constants.TerminationsModelExcludes as any)
  .shape({ organizationId: requiredIdSchema });

export const adminDeviceSchema = deviceDetailsSchema
  .omit(Constants.DevicesModelExcludes as any)
  .shape({ organizationId: requiredIdSchema });

export const adminDoctorSchema = doctorDetailsSchema
  .omit(Constants.DoctorsModelExcludes as any)
  .shape({ organizationId: requiredIdSchema });

export const adminPickupAddressSchema = pickupAddressDetailsSchema
  .omit(Constants.PickupAddressesModelExcludes as any)
  .shape({ organizationId: requiredIdSchema });

export const adminDeliveryAddressSchema = deliveryAddressDetailsSchema
  .omit(Constants.DeliveryAddressesModelExcludes as any);

export const adminPatientSchema = patientDetailsSchema
  .omit(Constants.PatientsModelExcludes as any)
  .shape({ organizationId: requiredIdSchema });

export const adminCreateUserSchema = userDetailsSchema
  .omit(Constants.UsersModelExcludes as any)
  .shape({ organizationId: requiredIdSchema });

export const adminUpdateUserSchema = userDetailsSchema
  .omit((Constants.UsersModelExcludes as any).concat(['password', 'password2']))
  .shape({ organizationId: requiredIdSchema });

export const adminRolesSchema = yup.array(adminRoleSchema).default([]);
export const adminOrganizationsSchema = yup.array(adminOrganizationSchema).default([]);
export const adminMaterialsSchema = yup.array(adminMaterialSchema).default([]);
export const adminTerminationsSchema = yup.array(adminTerminationSchema).default([]);
export const adminDevicesSchema = yup.array(adminDeviceSchema).default([]);
export const adminDoctorsSchema = yup.array(adminDoctorSchema).default([]);
export const adminPickupAddressesSchema = yup.array(adminPickupAddressSchema).default([]);
export const adminDeliveryAddressesSchema = yup.array(adminDeliveryAddressSchema).default([]);
export const adminPatientsSchema = yup.array(adminPatientSchema).default([]);
export const adminCreateUsersSchema = yup.array(adminCreateUserSchema).default([]);
export const adminUpdateUsersSchema = yup.array(adminUpdateUserSchema).default([]);


// Initial values
// ------------------------------------------------------------------------------------------------
export const adminRoleInitialValues = adminRoleSchema.getDefault();
export const adminOrganizationInitialValues = adminOrganizationSchema.getDefault();
export const adminMaterialInitialValues = adminMaterialSchema.getDefault();
export const adminTerminationInitialValues = adminTerminationSchema.getDefault();
export const adminDeviceInitialValues = adminDeviceSchema.getDefault();
export const adminDoctorInitialValues = adminDoctorSchema.getDefault();
export const adminPickupAddressInitialValues = adminPickupAddressSchema.getDefault();
export const adminDeliveryAddressInitialValues = adminDeliveryAddressSchema.getDefault();
export const adminPatientInitialValues = adminPatientSchema.getDefault();
export const adminCreateUserInitialValues = adminCreateUserSchema.getDefault();
export const adminUpdateUserInitialValues = adminUpdateUserSchema.getDefault();

export const adminRolesInitialValues = adminRolesSchema.getDefault();
export const adminOrganizationsInitialValues = adminOrganizationsSchema.getDefault();
export const adminMaterialsInitialValues = adminMaterialsSchema.getDefault();
export const adminTerminationsInitialValues = adminTerminationsSchema.getDefault();
export const adminDevicesInitialValues = adminDevicesSchema.getDefault();
export const adminDoctorsInitialValues = adminDoctorsSchema.getDefault();
export const adminPickupAddresssInitialValues = adminPickupAddressesSchema.getDefault();
export const adminDeliveryAddresssInitialValues = adminDeliveryAddressesSchema.getDefault();
export const adminPatientsInitialValues = adminPatientsSchema.getDefault();
export const adminCreateUsersInitialValues = adminCreateUsersSchema.getDefault();
export const adminUpdateUsersInitialValues = adminUpdateUsersSchema.getDefault();
