import * as yup from 'yup';

import { idSchema, stringDateSchema } from './misc';


export const alignmentDetailsSchema = yup
  .object({
    id: idSchema,
    saved: yup
      .boolean()
      .required()
      .label('Guardado')
      .default(false),
    date: stringDateSchema,
    type: yup
      .string()
      .required()
      .oneOf([
        'alineacion',
        'plantar',
      ], '"Tipo" debe ser uno de los siguientes valores: Alineación, Plantar')
      .label('Tipo')
      .default(''),
    foot: yup
      .string()
      .required()
      .oneOf([
        'izquierdo',
        'derecho',
        'ambos',
      ], '"pie" debe ser uno de los siguientes valores: Izquierdo, Derecho, Ambos')
      .label('Pie')
      .default(''),
    image: yup
      .string()
      .required()
      .url()
      .label('Imagen')
      .default(''),
    filename: yup
      .string()
      .required()
      .min(1)
      .max(256)
      .label('Nombre de archivo')
      .default(''),
    createdAt: stringDateSchema,
    updatedAt: stringDateSchema,
  });

export const alignmentsSchema = yup
  .array(alignmentDetailsSchema)
  .test(
    'minimumAlignments',
    '',
    (value, context) => {
      if (value && value.some((e) => e.foot === 'derecho') && value.some((e) => e.foot === 'izquierdo')) {
        return true;
      }
      return context.createError({
        message: 'Debe agregarse al menos 1 foto por cada lateralidad',
        path: 'alignments',
      });
    }
  )
  .min(2, 'Debe agregarse al menos dos fotos')
  .max(10, 'Solo puede agregarse una cantidad máxima de 10 fotos')
  .label('Alineaciones')
  .default([]);
