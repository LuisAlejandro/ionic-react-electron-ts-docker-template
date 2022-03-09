import {
  userDataDetailsSchema,
  requestDetailsSchema,
  insoleDetailsSchema,
  insolesSchema,
  terminationDetailsSchema,
  terminationsSchema,
  pickupAddressDetailsSchema,
  pickupAddressesSchema,
  patientDetailsSchema,
  patientsSchema,
  organizationDetailsSchema,
  organizationsSchema,
  materialDetailsSchema,
  materialsSchema,
  doctorDetailsSchema,
  doctorsSchema,
  productDetailsSchema,
  productsSchema,
  roleDetailsSchema,
  rolesSchema,
  requestDetailsModalSchema,
  requestsSchema,
  deviceDetailsSchema,
  userDetailsSchema,
  alignmentDetailsSchema,
  authDataDetailsSchema,
} from './schemas';


export const insoleDetailsInitialValues = insoleDetailsSchema.getDefault();
export const insolesInitialValues = insolesSchema.getDefault();

export const terminationDetailsInitialValues = terminationDetailsSchema.getDefault();
export const terminationsInitialValues = terminationsSchema.getDefault();

export const pickupAddressDetailsInitialValues = pickupAddressDetailsSchema.getDefault();
export const pickupAddressesInitialValues = pickupAddressesSchema.getDefault();

export const patientDetailsInitialValues = patientDetailsSchema.getDefault();
export const patientsInitialValues = patientsSchema.getDefault();

export const organizationDetailsInitialValues = organizationDetailsSchema.getDefault();
export const organizationsInitialValues = organizationsSchema.getDefault();

export const materialDetailsInitialValues = materialDetailsSchema.getDefault();
export const materialsInitialValues = materialsSchema.getDefault();

export const doctorDetailsInitialValues = doctorDetailsSchema.getDefault();
export const doctorsInitialValues = doctorsSchema.getDefault();

export const productDetailsInitialValues = productDetailsSchema.getDefault();
export const productsInitialValues = productsSchema.getDefault();

export const roleDetailsInitialValues = roleDetailsSchema.getDefault();
export const rolesInitialValues = rolesSchema.getDefault();

export const requestModalInitialValues = requestDetailsModalSchema.getDefault();
export const requestsInitialValues = requestsSchema.getDefault();

export const deviceDetailsInitialValues = deviceDetailsSchema.getDefault();
export const userDetailsInitialValues = userDetailsSchema.getDefault();
export const alignmentDetailsInitialValues = alignmentDetailsSchema.getDefault();
export const authDataInitialValues = authDataDetailsSchema.getDefault();

export const catalogInitialValues = { apiData: {} };
export const shapeInitialValues = { apiData: {} };
export const customshapeInitialValues = { apiData: {} };
export const rawScannerDetailsInitialValues = { content: [] };


export const userDataInitialValues = userDataDetailsSchema.getDefault();
export const requestInitialValues = requestDetailsSchema.getDefault();
