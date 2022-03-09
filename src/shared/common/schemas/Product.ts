import * as yup from 'yup';

import { idSchema, stringDateSchema } from './misc';


const productDetailsSchema = yup
  .object({
    id: idSchema,
    soleitId: yup
      .string()
      .defined()
      .label('Soleit ID')
      .default(''),
    type: yup
      .string()
      .oneOf([
        'plantilla',
        'reporte'
      ], '"Tipo de producto" debe ser uno de los siguientes valores: plantilla, reporte')
      .required()
      .label('Tipo de producto')
      .default(''),
    label: yup
      .string()
      .oneOf([
        'Plantilla',
        'Reporte'
      ], '"Etiqueta de producto" debe ser uno de los siguientes valores: Plantilla, Reporte')
      .required()
      .label('Etiqueta de producto')
      .default(''),
    basedOn: yup
      .string()
      .when('type', {
        is: 'plantilla',
        otherwise: (schema) => schema.strip(),
      })
      .label('Basado en')
      .default(''),
    qty: yup
      .number()
      .positive()
      .integer()
      .min(1)
      .max(10)
      .when('type', {
        is: 'plantilla',
        otherwise: (schema) => schema.strip(),
      })
      .label('Cantidad')
      .default(0),
    modality: yup
      .string()
      .oneOf([
        'venta',
        'investigación',
        'muestra',
      ], '"Modalidad" debe ser uno de los siguientes valores: Venta, Investigación, Muestra')
      .required()
      .label('Modalidad')
      .default(''),
    objective: yup
      .string()
      .oneOf([
        'deportivo',
        'ortopédico',
        'confort',
      ], '"Objetivo" debe ser uno de los siguientes valores: Deportivo, Ortopédico, Confort')
      .required()
      .label('Objetivo')
      .default(''),
    format: yup
      .string()
      .oneOf([
        'entera',
        '3/4'
      ], '"Formato" debe ser uno de los siguientes valores: Entera, 3/4')
      .when('type', {
        is: 'plantilla',
        otherwise: (schema) => schema.strip()
      })
      .label('Formato')
      .default(''),
    fabrication: yup
      .string()
      .oneOf([
        'CNC',
        '3D'
      ], '"Fabricación" debe ser uno de los siguientes valores: CNC, 3D')
      .when('type', {
        is: 'plantilla',
        otherwise: (schema) => schema.strip(),
      })
      .label('Fabricación')
      .default(''),
    createdAt: stringDateSchema,
    updatedAt: stringDateSchema,
  });

const productSelectionDetailsSchema = productDetailsSchema.pick(['id', 'type', 'label', 'qty']);

const productsSchema = yup
  .array(productDetailsSchema)
  .min(1, 'Debe agregarse al menos un producto')
  .max(10, 'Solo puede agregarse una cantidad máxima de 10 productos')
  .label('Productos')
  .default([]);

const productsSelectionSchema = yup
  .array(productSelectionDetailsSchema)
  .min(1, 'Debe agregarse al menos un producto')
  .max(10, 'Solo puede agregarse una cantidad máxima de 10 productos')
  .label('Productos')
  .default([]);

  
export { productsSchema, productDetailsSchema, productsSelectionSchema, productSelectionDetailsSchema };
