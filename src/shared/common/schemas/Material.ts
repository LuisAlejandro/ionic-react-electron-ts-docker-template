import * as yup from 'yup';

import { idSchema, stringDateSchema } from './misc';


const materialDetailsSchema = yup
  .object({
    id: idSchema,
    name: yup
      .string()
      .required()
      .min(2)
      .max(256)
      .label('Nombre')
      .default(''),
    type: yup
      .string()
      .required()
      .min(2)
      .max(256)
      .label('Tipo')
      .default(''),
    createdAt: stringDateSchema,
    updatedAt: stringDateSchema,
  });

const materialsSchema = yup
  .array(materialDetailsSchema)
  .label("Materiales")
  .default([]);


export { materialDetailsSchema, materialsSchema };
