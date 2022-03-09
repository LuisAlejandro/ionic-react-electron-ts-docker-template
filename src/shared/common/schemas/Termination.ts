import * as yup from 'yup';

import { idSchema, stringDateSchema } from './misc';


const terminationDetailsSchema = yup
  .object({
    id: idSchema,
    name: yup
      .string()
      .required()
      .min(2)
      .max(256)
      .label('Nombre')
      .default(''),
    alias: yup
      .string()
      .required()
      .min(2)
      .max(256)
      .label('Alias')
      .default(''),
    createdAt: stringDateSchema,
    updatedAt: stringDateSchema,
  });

const terminationsSchema = yup
  .array(terminationDetailsSchema)
  .label("Terminaciones")
  .default([]);


export { terminationDetailsSchema, terminationsSchema };
