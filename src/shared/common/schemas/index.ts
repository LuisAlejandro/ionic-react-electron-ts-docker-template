import * as yup from 'yup';

import { alignmentDetailsSchema as alignmentDetailsSchemaBase } from "./Alignment";
import { deliveryAddressDetailsSchema as deliveryAddressDetailsSchemaBase } from "./DeliveryAddress";
import { deviceDetailsSchema as deviceDetailsSchemaBase } from "./Device";
import { doctorDetailsSchema as doctorDetailsSchemaBase } from "./Doctor";
import { insoleDetailsSchema as insoleDetailsSchemaBase } from "./Insole";
import { materialDetailsSchema as materialDetailsSchemaBase } from "./Material";
import { organizationDetailsSchema as organizationDetailsSchemaBase } from "./Organization";
import { patientDetailsSchema as patientDetailsSchemaBase } from "./Patient";
import { permissionDetailsSchema as permissionDetailsSchemaBase } from "./Permission";
import { pickupAddressDetailsSchema as pickupAddressDetailsSchemaBase } from "./PickupAddress";
import { productDetailsSchema as productDetailsSchemaBase } from "./Product";
import { requestDetailsSchema as requestDetailsSchemaBase } from "./Request";
import { roleDetailsSchema as roleDetailsSchemaBase } from "./Role";
import { scannerDetailsSchema as scannerDetailsSchemaBase } from "./Scanner";
import { statusDetailsSchema as statusDetailsSchemaBase } from "./Status";
import { terminationDetailsSchema as terminationDetailsSchemaBase } from "./Termination";
import { userDetailsSchema as userDetailsSchemaBase } from "./User";
import { alignmentsSchema as alignmentsSchemaBase } from "./Alignment";
import { deliveryAddressesSchema } from "./DeliveryAddress";
import { devicesSchema } from "./Device";
import { doctorsSchema } from "./Doctor";
import { insolesSchema } from "./Insole";
import { materialsSchema } from "./Material";
import { organizationsSchema } from "./Organization";
import { patientsSchema } from "./Patient";
import { permissionsSchema } from "./Permission";
import { pickupAddressesSchema } from "./PickupAddress";
import { productsSchema, productsSelectionSchema } from "./Product";
import { requestsSchema } from "./Request";
import { rolesSchema } from "./Role";
import { scannersSchema, scanDataSchema } from "./Scanner";
// import { xypSchema } from "./Scanner";
import { statusesSchema } from "./Status";
import { terminationsSchema } from "./Termination";
import { usersSchema, userDataDetailsSchema } from "./User";
import { documentDetailsSchema, documentsSchema } from "./Document";
import { findingDetailsSchema, findingsSchema } from "./Finding";
import { footDetailsSchema, feetSchema } from "./Foot";
import { indicationDetailsSchema, indicationsSchema } from "./Indication";
import { pathologyDetailsSchema, pathologiesSchema } from "./Pathology";
import { painPointsDetailsSchema } from "./PainPoint";
import { idSchema, tokenSchema, nullableIdSchema, requiredIdSchema } from "./misc";


const alignmentDetailsSchema = alignmentDetailsSchemaBase.shape({
  requestId: idSchema,
  request: requestDetailsSchemaBase,
  patientId: idSchema,
  patient: patientDetailsSchemaBase,
});

const deliveryAddressDetailsSchema = deliveryAddressDetailsSchemaBase.shape({
  requests: requestsSchema,
  patientId: idSchema,
  patient: patientDetailsSchemaBase,
});

const deviceDetailsSchema = deviceDetailsSchemaBase.shape({
  organizationId: idSchema,
  organization: organizationDetailsSchemaBase,
});

const doctorDetailsSchema = doctorDetailsSchemaBase.shape({
  organizationId: idSchema,
  organization: organizationDetailsSchemaBase,
  requests: requestsSchema,
});

const insoleDetailsSchema = insoleDetailsSchemaBase.shape({
  patientId: idSchema,
  products: productsSchema,
});

const materialDetailsSchema = materialDetailsSchemaBase.shape({
  organizationId: idSchema,
  organization: organizationDetailsSchemaBase,
  products: productsSchema,
});

const organizationDetailsSchema = organizationDetailsSchemaBase.shape({
  patients: patientsSchema,
  users: usersSchema,
  requests: requestsSchema,
  doctors: doctorsSchema,
  devices: devicesSchema,
  materials: materialsSchema,
  terminations: terminationsSchema,
  pickupAddresses: pickupAddressesSchema,
});

const patientDetailsSchema = patientDetailsSchemaBase.shape({
  organizationId: idSchema,
  organization: organizationDetailsSchemaBase,
  requests: requestsSchema,
  deliveryAddresses: deliveryAddressesSchema,
  products: productsSchema,
  alignments: alignmentsSchemaBase,
  scanners: scannersSchema,
  insoles: insolesSchema,
});

const permissionDetailsSchema = permissionDetailsSchemaBase.shape({
  roles: rolesSchema,
});

const pickupAddressDetailsSchema = pickupAddressDetailsSchemaBase.shape({
  organizationId: idSchema,
  organization: organizationDetailsSchemaBase,
  requests: requestsSchema,
});

const productDetailsSchema = productDetailsSchemaBase.shape({
  insoleId: idSchema,
  insole: insoleDetailsSchemaBase,
  materialId: idSchema,
  material: materialDetailsSchemaBase,
  terminationId: idSchema,
  termination: terminationDetailsSchemaBase,
  patientId: idSchema,
  patient: patientDetailsSchemaBase,
  requestId: idSchema,
  request: requestDetailsSchemaBase,
  statusId: idSchema,
  status: statusDetailsSchemaBase,
});

const requestDetailsSchema = requestDetailsSchemaBase.shape({
  userId: nullableIdSchema,
  user: userDetailsSchemaBase.shape({
    password: yup.string().strip(),
    password2: yup.string().strip(),
  }),
  patientId: nullableIdSchema,
  patient: patientDetailsSchemaBase,
  doctorId: nullableIdSchema,
  doctor: doctorDetailsSchemaBase.nullable().default(null),
  statusId: nullableIdSchema,
  status: statusDetailsSchemaBase,
  organizationId: nullableIdSchema,
  organization: organizationDetailsSchemaBase,
  pickupAddressId: nullableIdSchema,
  pickupAddress: pickupAddressDetailsSchemaBase.nullable().default(null),
  deliveryAddressId: nullableIdSchema,
  deliveryAddress: deliveryAddressDetailsSchemaBase.nullable().default(null),
  products: productsSchema,
  scanners: scannersSchema,
  alignments: alignmentsSchemaBase,
});

const roleDetailsSchema = roleDetailsSchemaBase.shape({
  users: usersSchema,
  permissions: permissionsSchema,
});

const scannerDetailsSchema = scannerDetailsSchemaBase.shape({
  requestId: idSchema,
  request: requestDetailsSchemaBase,
  patientId: idSchema,
  patient: patientDetailsSchemaBase,
});

const statusDetailsSchema = statusDetailsSchemaBase.shape({
  requests: requestsSchema,
  products: productsSchema,
});

const terminationDetailsSchema = terminationDetailsSchemaBase.shape({
  organizationId: idSchema,
  organization: organizationDetailsSchemaBase,
  products: productsSchema,
});

const userDetailsSchema = userDetailsSchemaBase.shape({
  requests: requestsSchema,
  organizationId: idSchema,
  organization: organizationDetailsSchemaBase,
  roleId: idSchema,
  role: roleDetailsSchemaBase,
});

const authDataDetailsSchema = userDetailsSchemaBase.shape({
  password: yup.string().strip(),
  password2: yup.string().strip(),
  token: tokenSchema,
  organization: organizationDetailsSchemaBase,
  role: roleDetailsSchemaBase.shape({
    permissions: permissionsSchema,
  }),
});

const alignmentsSchema = alignmentsSchemaBase;

const requestDetailsModalSchema = requestDetailsSchema.pick([
  'anamnesis',
  'antropometria',
  'scanners',
  'alignments',
  'products',
]);


export {
  alignmentDetailsSchema, alignmentsSchema,
  deliveryAddressDetailsSchema, deliveryAddressesSchema,
  deviceDetailsSchema, devicesSchema,
  doctorDetailsSchema, doctorsSchema,
  documentDetailsSchema, documentsSchema,
  findingDetailsSchema, findingsSchema,
  footDetailsSchema, feetSchema,
  indicationDetailsSchema, indicationsSchema,
  insoleDetailsSchema, insolesSchema,
  materialDetailsSchema, materialsSchema,
  organizationDetailsSchema, organizationsSchema,
  pathologyDetailsSchema, pathologiesSchema,
  patientDetailsSchema, patientsSchema,
  permissionDetailsSchema, permissionsSchema,
  pickupAddressDetailsSchema, pickupAddressesSchema,
  productsSchema, productDetailsSchema, productsSelectionSchema,
  requestDetailsSchema, requestsSchema,
  roleDetailsSchema, rolesSchema,
  scannerDetailsSchema, scannersSchema, scanDataSchema,
  // xypSchema,
  statusDetailsSchema, statusesSchema,
  terminationDetailsSchema, terminationsSchema,
  authDataDetailsSchema,
  userDetailsSchema, userDataDetailsSchema, usersSchema,
  painPointsDetailsSchema,
  requestDetailsModalSchema,
  requiredIdSchema
};
