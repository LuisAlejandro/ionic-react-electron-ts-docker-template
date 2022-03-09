import * as yup from 'yup';

import { footDetailsSchema } from './Foot';
import { painPointsDetailsSchema } from './PainPoint';
import { findingsSchema } from './Finding';
import { pathologyDetailsSchema } from './Pathology';
import { indicationDetailsSchema } from './Indication';
import { documentDetailsSchema } from './Document';
import { idSchema, stringDateSchema } from './misc';


const requestDetailsSchema = yup
  .object({
    id: idSchema,
    soleitId: yup
      .string()
      .defined()
      .label('Soleit ID')
      .default(''),
    medicalOrder: yup
      .object({
        enabled: yup
          .boolean()
          .required()
          .label('Habilitado')
          .default(false),
        pathologies: yup
          .array(pathologyDetailsSchema)
          .max(10, 'Solo puede agregarse una cantidad máxima de 10 patologías')
          .when('enabled', { is: false, then: (schema) => schema.strip() })
          .label("Patologías")
          .default([]),
        indications: yup
          .array(indicationDetailsSchema)
          .max(10, 'Solo puede agregarse una cantidad máxima de 10 indicaciones')
          .when('enabled', { is: false, then: (schema) => schema.strip() })
          .label("Indicaciones")
          .default([]),
        documents: yup
          .array(documentDetailsSchema)
          .min(1, 'Debe agregarse al menos un documento')
          .max(5, 'Solo puede agregarse una cantidad máxima de 5 documentos')
          .when('enabled', { is: false, then: (schema) => schema.strip() })
          .label("Documentos")
          .default([]),
        comments: yup
          .string()
          .matches(/^(|.{3,1024})$/, '"Comentarios" debe tener mínimo 3 caracteres y máximo 1024')
          .when('enabled', { is: false, then: (schema) => schema.strip() })
          .label('Comentarios')
          .default(''),
      })
      .test(
        'minimumPathologiesOrIndications',
        '',
        (value, context) => {
          if (value && (!value.enabled || (value.pathologies && value.indications && (value.pathologies.length > 0 || value.indications.length > 0)))) {
            return true;
          }
          return context.createError({
            message: 'Debe ingresar al menos un diagnóstico o una indicación',
            path: 'medicalOrder.minimumPathologiesOrIndications',
          });
        }
      ),
    anamnesis: yup
      .object({
        motivoConsulta: yup
          .string()
          .required()
          .min(3)
          .max(1024)
          .label('Motivo de consulta')
          .default(''),
        descripcionAnamnesis: yup
          .string()
          .matches(/^(|.{3,1024})$/, '"Descripción de anamnesis" debe tener mínimo 3 caracteres y máximo 1024')
          .label('Descripción de anamnesis')
          .default(''),
        lesionesPreviasCirugias: yup
          .string()
          .matches(/^(|.{3,1024})$/, '"Lesiones previas y cirugías" debe tener mínimo 3 caracteres y máximo 1024')
          .label('Lesiones previas y cirugías')
          .default(''),
        alergiaLatex: yup
          .string()
          .oneOf([
            'si',
            'no',
            'no sabe'
          ], '"¿Alergia al látex?" debe ser uno de los siguientes valores: Si, No, No sabe')
          .label('¿Alergia al látex?')
          .default(''),
        enfermedadesAlergias: yup
          .object({
            diabetes: yup
              .boolean()
              .label('Diabetes')
              .default(false),
            artritisReumatoide: yup
              .boolean()
              .label('Artritis reumatoide')
              .default(false),
            charcot: yup
              .boolean()
              .label('Charcot')
              .default(false),
            otro: yup
              .boolean()
              .label('Otro')
              .default(false),
          }),
        actividadFisica: yup
          .string()
          .required()
          .oneOf([
            'si',
            'no'
          ], '"¿Realiza actividad física?" debe ser uno de los siguientes valores: Si, No')
          .label('¿Realiza actividad física?')
          .default(''),
        frecuenciaActividad: yup
          .string()
          .oneOf([
            '1o2',
            '3a5',
            '6o7',
            'alto'
          ], '"Frecuencia de actividad" debe ser uno de los siguientes valores: 1 o 2 por semana, 3 a 5 por semana, 6 o 7 por semana, Alto rendimiento')
          .when('actividadFisica', { is: 'no', then: (schema) => schema.strip() })
          .label('Frecuencia de actividad')
          .default(''),
        deporte: yup
          .object({
            running: yup
              .boolean()
              .label('Running')
              .default(false),
            gimnasio: yup
              .boolean()
              .label('Gimnasio')
              .default(false),
            ciclismo: yup
              .boolean()
              .label('Ciclismo')
              .default(false),
            trekking: yup
              .boolean()
              .label('Trekking')
              .default(false),
            futbol: yup
              .boolean()
              .label('Fútbol')
              .default(false),
            yogaPilates: yup
              .boolean()
              .label('Yoga-Pilates')
              .default(false),
            escalada: yup
              .boolean()
              .label('Escalada')
              .default(false),
            altaMontana: yup
              .boolean()
              .label('Alta Montaña')
              .default(false),
            otroBajoImpacto: yup
              .boolean()
              .label('Otro de bajo impacto')
              .default(false),
            otroAltoImpacto: yup
              .boolean()
              .label('Otro de alto impacto')
              .default(false),
          })
          .when('actividadFisica', { is: 'no', then: (schema) => schema.strip() })
          .test(
            'minimumDeporte',
            '',
            (value, context) => {
              if (value &&
                  context.parent.actividadFisica === 'si' &&
                  (value.running ||
                   value.gimnasio ||
                   value.ciclismo ||
                   value.trekking ||
                   value.futbol ||
                   value.yogaPilates ||
                   value.escalada ||
                   value.altaMontana ||
                   value.otroBajoImpacto ||
                   value.otroAltoImpacto)) {
                return true;
              }
              if (context.parent.actividadFisica === 'no') return true;
              return context.createError({
                message: 'Debe al menos seleccionar una actividad deportiva',
                path: 'anamnesis.deporte',
              });
            }
          )
          .label('Deporte'),
        aparicionDolor: yup
          .string()
          .oneOf([
            '-6',
            '+6'
          ], '"Aparición del dolor" debe ser uno de los siguientes valores: -6 meses, +6 meses')
          .label('Aparición del dolor')
          .default(''),
        dolorPeak: yup
          .number()
          .positive()
          .integer()
          .min(0)
          .max(10)
          .when('aparicionDolor', {
            is: (value: string) => value === '+6' || value === '-6',
            otherwise: (schema) => schema.strip(),
          })
          .label('Dolor peak')
          .default(0),
        dolorPromedio: yup
          .number()
          .positive()
          .integer()
          .min(0)
          .max(10)
          .when('aparicionDolor', {
            is: (value: string) => value === '+6' || value === '-6',
            otherwise: (schema) => schema.strip(),
          })
          .label('Dolor promedio')
          .default(0),
        painPoints: yup
          .object({
            left: yup
              .array(painPointsDetailsSchema)
              .label('Puntos de dolor pie izquierdo')
              .default([]),
            right: yup
              .array(painPointsDetailsSchema)
              .label('Puntos de dolor pie derecho')
              .default([]),
          })
          .test(
            'minimumPainPoints',
            '',
            (value, context) => {
              if (value && value.left && value.right && (value.left.length > 0 || value.right.length > 0)) {
                return true;
              }
              return context.createError({
                message: 'Debe al menos seleccionar una zona de dolor de alguno de los pies',
                path: 'anamnesis.painPoints',
              });
            }
          )
          .when('aparicionDolor', {
            is: (value: string) => value === '+6' || value === '-6',
            otherwise: (schema) => schema.strip(),
          })
          .label('Puntos de dolor'),
        comments: yup
          .string()
          .matches(/^(|.{3,1024})$/, '"Comentarios" debe tener mínimo 3 caracteres y máximo 1024')
          .label('Comentarios')
          .default(''),
      }),
    antropometria: yup
      .object({
        estatura: yup
          .number()
          .required()
          .positive()
          .min(1)
          .max(300)
          .label('Estatura (cm)')
          .default(0),
        peso: yup
          .number()
          .required()
          .positive()
          .min(1)
          .max(300)
          .label('Peso (kg)')
          .default(0),
        hiperlaxitud: yup
          .string()
          .required()
          .oneOf(['si', 'no'], '"Hiperlaxitud" debe ser uno de los siguientes valores: Si, No')
          .label('Hiperlaxitud')
          .default(''),
        pieIzquierdo: footDetailsSchema
          .label('Pie izquierdo'),
        pieDerecho: footDetailsSchema
          .label('Pie derecho'),
      }),
    findings: findingsSchema,
    blocked: yup
      .object({
        asked: yup
          .boolean()
          .required()
          .default(false),
        state: yup
          .boolean()
          .required()
          .default(false),
      }),
    productSpecs: yup
      .boolean()
      .required()
      .default(false),
    createdAt: stringDateSchema,
    updatedAt: stringDateSchema,
  });

const requestsSchema = yup
  .array(requestDetailsSchema)
  .label("Solicitudes")
  .default([]);


export { requestsSchema, requestDetailsSchema };
