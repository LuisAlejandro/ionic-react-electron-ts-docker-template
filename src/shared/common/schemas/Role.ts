import * as yup from 'yup';

import { idSchema, stringDateSchema } from './misc';


const roleDetailsSchema = yup
  .object({
    id: idSchema,
    name: yup
      .string()
      .required()
      .oneOf([
        'Admin',
        'Evaluador',
        'Diseñador',
        'Fabricante',
        'Médico',
        'Paciente',
        'Visita',
      ])
      .label('Nombre')
      .default(''),
    createdAt: stringDateSchema,
    updatedAt: stringDateSchema,
  });

const rolesSchema = yup
  .array(roleDetailsSchema)
  .label("Roles")
  .default([]);


export { roleDetailsSchema, rolesSchema };
