import * as yup from 'yup';

import { idSchema, stringDateSchema } from './misc';


// const xySchema = yup
//   .object({
//     x: yup
//       .number()
//       .integer()
//       .positive()
//       .max(1000)
//       .required()
//       .default(0),
//     y: yup
//       .number()
//       .integer()
//       .positive()
//       .max(1000)
//       .required()
//       .default(0),
//   });

// const xypSchema = yup
//   .object({
//     x: yup
//       .number()
//       .integer()
//       .positive()
//       .max(1000)
//       .required()
//       .default(0),
//     y: yup
//       .number()
//       .integer()
//       .positive()
//       .max(1000)
//       .required()
//       .default(0),
//     pressure: yup
//       .number()
//       .positive()
//       .max(1000.0)
//       .required()
//       .default(0),
//   });

// const scannersDataSchema = yup
//   .object({
//     frame_id: yup
//       .number()
//       .integer()
//       .positive()
//       .max(10000)
//       .required()
//       .label('ID de cuadro')
//       .default(0),
//     sensors: yup
//       .array(xypSchema)
//       .label('Sensores')
//       .default([]),
//   });

// const scannersInfoSchema = yup
//   .object({
//     total_frames: yup
//       .number()
//       .integer()
//       .positive()
//       .max(10000)
//       .required()
//       .label('Total de cuadros')
//       .default(0),
//     actividad: yup
//       .string()
//       .required()
//       .oneOf([
//         'de pie',
//         'marcha',
//         'trote',
//       ], '"Actividad" debe ser uno de los siguientes valores: De pie, Marcha, Trote')
//       .label('Actividad')
//       .default(''),
//     lateralidad: yup
//       .string()
//       .required()
//       .oneOf([
//         'izquierdo',
//         'derecho',
//       ], '"Lateralidad" debe ser uno de los siguientes valores: Izquierdo, Derecho')
//       .label('Lateralidad')
//       .default(''),
//     muestra: yup
//       .string()
//       .required()
//       .oneOf([
//         'file',
//         'hardware',
//       ], '"Muestra" debe ser uno de los siguientes valores: File, Hardware')
//       .label('Muestra')
//       .default(''),
//     metodo: yup
//       .string()
//       .required()
//       .oneOf([
//         'estatico',
//         'dinamico',
//       ], '"Método" debe ser uno de los siguientes valores: Estático, Dinámico')
//       .label('Método')
//       .default(''),
//     fecha: yup
//       .string()
//       .required()
//       .label('Fecha')
//       .default(''),
//     hora: yup
//       .string()
//       .required()
//       .label('Hora')
//       .default(''),
//     scale: yup
//       .number()
//       .integer()
//       .positive()
//       .oneOf([1])
//       .required()
//       .label('Escala')
//       .default(1),
//     x_max: yup
//       .number()
//       .integer()
//       .positive()
//       .max(1000)
//       .required()
//       .label('X Máximo')
//       .default(0),
//     y_max: yup
//       .number()
//       .integer()
//       .positive()
//       .max(1000)
//       .required()
//       .label('Y Máximo')
//       .default(0),
//     frecuencia_muestreo: yup
//       .number()
//       .integer()
//       .positive()
//       .max(1000)
//       .required()
//       .label('Frecuencia de muestreo')
//       .default(0),
//     frame_peak_info: yup
//       .array(xypSchema)
//       .required()
//       .label('Frame peak info')
//       .default([]),
//     centro_presiones_info: yup
//       .array(xySchema)
//       .required()
//       .label('Centro presiones info')
//       .default([]),
//     peak_presiones_info: yup
//       .array(xypSchema)
//       .required()
//       .label('Peak presiones info')
//       .default([]),
//   });

const scanDataSchema = yup
  .object({
    data: yup.array().default([]),
    info: yup.object().default({}),
  })
  .label('Escaners');

const scannerDetailsSchema = yup
  .object({
    id: idSchema,
    saved: yup
      .boolean()
      .required()
      .label('Guardado')
      .default(false),
    date: stringDateSchema,
    activity: yup
      .string()
      .required()
      .oneOf([
        'de pie',
        'marcha',
        'trote',
      ], '"Actividad" debe ser uno de los siguientes valores: De pie, Marcha, Trote')
      .label('Actividad')
      .default(''),
    foot: yup
      .string()
      .required()
      .oneOf([
        'izquierdo',
        'derecho',
        'ambos'
      ], '"Pie" debe ser uno de los siguientes valores: Izquierdo, Derecho, Ambos')
      .label('Pie')
      .default(''),
    orientation: yup
      .string()
      .required()
      .oneOf([
        'arriba',
        'abajo',
        'izquierda',
        'derecha',
      ], '"Tipo" debe ser uno de los siguientes valores: Arriba, Abajo, Izquierda, Derecha')
      .label('Orientación')
      .default(''),
    scanners: scanDataSchema,
    createdAt: stringDateSchema,
    updatedAt: stringDateSchema,
  });

const scannersSchema = yup
  .array(scannerDetailsSchema)
  .test(
    'minimumScanners',
    '',
    (value, context) => {
      if (value && value.some((e) => e.foot === 'derecho') && value.some((e) => e.foot === 'izquierdo')) {
        return true;
      }
      return context.createError({
        message: 'Debe agregarse al menos 1 escaner por cada lateralidad',
        path: 'scanners',
      });
    }
  )
  .min(2, 'Debe agregarse al menos dos escaners')
  .max(10, 'Solo puede agregarse una cantidad máxima de 10 escaners')
  .label('Presión plantar')
  .default([]);


export {
  // xypSchema,
  // scannersDataSchema,
  // scannersInfoSchema,
  scanDataSchema,
  scannersSchema,
  scannerDetailsSchema
};
