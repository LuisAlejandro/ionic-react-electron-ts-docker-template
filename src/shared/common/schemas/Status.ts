import * as yup from 'yup';

import { idSchema, stringDateSchema } from './misc';


const statusDetailsSchema = yup
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
      .oneOf([
        'solicitud',
        'plantilla',
        'reporte',
      ], '"Tipo" debe ser uno de los siguientes valores: Solicitud, Plantilla, Reporte')
      .label('Tipo')
      .default(''),
    createdAt: stringDateSchema,
    updatedAt: stringDateSchema,
  });

const statusesSchema = yup
  .array(statusDetailsSchema)
  .label("Estados")
  .default([]);

  
export { statusDetailsSchema, statusesSchema };
