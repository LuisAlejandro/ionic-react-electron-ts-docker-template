import * as yup from 'yup';

import { idSchema, stringDateSchema } from './misc';


const permissionDetailsSchema = yup
  .object({
    id: idSchema,
    name: yup
      .string()
      .required()
      .min(2)
      .max(256)
      .label('Nombre')
      .default(''),
    createdAt: stringDateSchema,
    updatedAt: stringDateSchema,
  });

const permissionsSchema = yup
  .array(permissionDetailsSchema)
  .label("Permisos")
  .default([]);

  
export { permissionDetailsSchema, permissionsSchema };
