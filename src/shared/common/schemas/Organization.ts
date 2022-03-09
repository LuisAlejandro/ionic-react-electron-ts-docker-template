import * as yup from 'yup';

import { idSchema, stringDateSchema } from './misc';


const organizationDetailsSchema = yup
  .object({
    id: idSchema,
    name: yup
      .string()
      .min(2)
      .max(256)
      .required()
      .label('Nombre de la Organización')
      .default(''),
    type: yup
      .string()
      .required()
      .oneOf([
        'adquisición',
        'fabricación'
      ], '"Tipo de organización" debe ser uno de los siguientes valores: Adquisición, Fabricación')
      .label('Tipo de Organización')
      .default(''),
    logo: yup
      .string()
      .optional()
      .url()
      .label('Logo')
      .default(''),
    createdAt: stringDateSchema,
    updatedAt: stringDateSchema,
  });

const organizationsSchema = yup
  .array(organizationDetailsSchema)
  .label("Organizaciones")
  .default([]);


export { organizationDetailsSchema, organizationsSchema };
