import * as yup from 'yup';

import {
  emailSchema,
  idNumberSchema,
  genderSchema,
  phoneSchema,
  idTypeSchema,
  lastNameSchema,
  firstNameSchema,
  idSchema,
  stringDateSchema
} from './misc';


const patientDetailsSchema = yup
  .object({
    id: idSchema,
    soleitId: yup
      .string()
      .defined()
      .label('Soleit ID')
      .default(''),
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    idType: idTypeSchema,
    idNumber: idNumberSchema,
    phone: phoneSchema,
    gender: genderSchema,
    email: emailSchema,
    birthday: yup
      .string()
      .required()
      .label('Cumpleaños')
      .default(''),
    createdAt: stringDateSchema,
    updatedAt: stringDateSchema,
  });

const patientsSchema = yup
  .array(patientDetailsSchema)
  .label("Pacientes")
  .default([]);


export { patientDetailsSchema, patientsSchema };
