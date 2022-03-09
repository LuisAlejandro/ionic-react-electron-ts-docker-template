import * as yup from 'yup';

import {
  idTypeSchema,
  idNumberSchema,
  idSchema,
  stringDateSchema
} from './misc';


const doctorDetailsSchema = yup
  .object({
    id: idSchema,
    name: yup
      .string()
      .required()
      .min(3)
      .max(256)
      .label('Nombre del Doctor')
      .default(''),
    qualification: yup
      .string()
      .oneOf([
        'doctor',
        'kinesiólogo'
      ], '"Especialidad" debe ser uno de los siguientes valores: Doctor, Kinesiólogo')
      .required()
      .label('Especialidad')
      .default(''),
    idType: idTypeSchema,
    idNumber: idNumberSchema,
    createdAt: stringDateSchema,
    updatedAt: stringDateSchema,
  });

const doctorsSchema = yup
  .array(doctorDetailsSchema)
  .label("Doctores")
  .default([]);


export { doctorDetailsSchema, doctorsSchema };
