import * as yup from 'yup';

import { idSchema, stringDateSchema } from './misc';


const deviceDetailsSchema = yup
  .object({
    id: idSchema,
    name: yup
      .string()
      .min(2)
      .max(256)
      .required()
      .label('Nombre del Equipo')
      .default(''),
    model: yup
      .string()
      .min(2)
      .max(256)
      .required()
      .label('Modelo')
      .default(''),
    manufacturer: yup
      .string()
      .min(2)
      .max(256)
      .required()
      .label('Fabricante')
      .default(''),
    serialNumber: yup
      .string()
      .min(2)
      .max(256)
      .required()
      .label('N° de Serial')
      .default(''),
    verticalSensor: yup
      .number()
      .integer()
      .min(1)
      .max(512)
      .required()
      .label('Nº de Sensores Verticales')
      .default(0),
    horizontalSensor: yup
      .number()
      .integer()
      .min(1)
      .max(512)
      .required()
      .label('Nº de Sensores Horizontales')
      .default(0),
    verticalDiscretization: yup
      .number()
      .min(1)
      .max(512)
      .required()
      .label('Discretización Vertical')
      .default(0),
    horizontalDiscretization: yup
      .number()
      .min(1)
      .max(512)
      .required()
      .label('Discretización Horizontal')
      .default(0),
    createdAt: stringDateSchema,
    updatedAt: stringDateSchema,
  });

const devicesSchema = yup
  .array(deviceDetailsSchema)
  .label("Dispositivos")
  .default([]);


export { deviceDetailsSchema, devicesSchema };
