import * as yup from 'yup';

import { phoneRegExp } from 'src/shared/common/helpers';


const stringDateSchema = yup
  .string()
  .required()
  .test(
    'date',
    '',
    (value, context) => {
      if (value) {
        return new Date(value).toISOString() === value;
      }
      return context.createError({
        message: 'date debe tener el formato correcto',
        path: 'date',
      });
    }
  )
  .label('Fecha')
  .default(new Date().toISOString());

const emailSchema = yup
  .string()
  .required()
  .email()
  .label('Correo')
  .default('');

const tokenSchema = yup
  .string()
  .required()
  .default('');

const idSchema = yup
  .string()
  .defined()
  .test(
    'isId',
    '',
    (value, context) => {
      if (value === '') return true;
      const r = new RegExp(/^[0-9a-fA-F]{24}$/);
      if (value && value.length === 24 && r.test(value)) return true;
      return context.createError({
        message: 'Debe ser un id',
      });
    }
  )
  .default('');

const requiredIdSchema = yup
  .string()
  .required()
  .test(
    'isId',
    '',
    (value, context) => {
      const r = new RegExp(/^[0-9a-fA-F]{24}$/);
      if (value && value.length === 24 && r.test(value)) return true;
      return context.createError({
        message: 'Debe ser un id',
      });
    }
  )
  .default('');

const nullableIdSchema = yup
  .string()
  .defined()
  .nullable()
  .test(
    'isId',
    '',
    (value, context) => {
      if (value === '' || value === null) return true;
      const r = new RegExp(/^[0-9a-fA-F]{24}$/);
      if (value && value.length === 24 && r.test(value)) return true;
      return context.createError({
        message: 'Debe ser un id',
      });
    }
  )
  .default(null);

const genderSchema = yup
  .string()
  .required()
  .oneOf([
    'M',
    'F'
  ], '"Género" debe ser uno de los siguientes valores: Masculino, Femenino')
  .label('Género')
  .default('');

const firstNameSchema = yup
  .string()
  .required()
  .min(1)
  .max(256)
  .label('Nombres')
  .default('');

const lastNameSchema = yup
  .string()
  .required()
  .min(1)
  .max(256)
  .label('Apellidos')
  .default('');

const idTypeSchema = yup
  .string()
  .required()
  .oneOf([
    'rut',
    'passport'
  ], '"Tipo de identificación" debe ser uno de los siguientes valores: Rut, Pasaporte')
  .label('Tipo de identificación')
  .default('');

const idNumberSchema = yup
  .string()
  .when('idType', {
    is: 'rut',
    then: (schema) => schema.label('Rut'),
    otherwise: (schema) => schema.label('Pasaporte'),
  })
  .required()
  .min(1)
  .max(32)
  .default('');

const phoneSchema = yup
  .string()
  .required()
  .matches(phoneRegExp, 'Número telefónico no es válido')
  .label('Número telefónico')
  .default('');

const catalogSchema = yup
  .string()
  .required()
  .min(1)
  .max(64)
  .default('');

const sizeSchema = yup
  .number()
  .required()
  .default(0);

const urlSchema = yup
  .string()
  .required()
  .url()
  .default('');

const passwordSchema = yup
  .string()
  .required()
  .min(6)
  .max(30)
  .default('');

const fileuploadSchema = yup
  .object({
    type: yup
      .string()
      .required()
      .min(1)
      .max(128)
      .default(''),
    filename: yup
      .string()
      .required()
      .min(1)
      .max(128)
      .default(''),
    content: yup
      .string()
      .required()
      .min(1)
      .default(''),
    bucketname: yup
      .string()
      .required()
      .oneOf([
        'avatarusersoleit',
        'alineacionessoleit',
        'medicalorders',
        'orgslogos'
      ])
      .default(''),
  });

const fileremoveSchema = yup
  .object({
    filename: yup
      .string()
      .required()
      .min(1)
      .max(128)
      .default(''),
    bucketname: yup
      .string()
      .required()
      .oneOf([
        'avatarusersoleit',
        'alineacionessoleit',
        'medicalorders',
        'orgslogos'
      ])
      .default(''),
  });

const catalogshapeSchema = yup
  .object({
    top: yup
      .string()
      .required()
      .oneOf([
        'rounded',
        'sharp',
        'square'
      ])
      .default(''),
    length: sizeSchema,
    metatarsusWidth: sizeSchema,
    heelWidth: sizeSchema,
  });


export {
  lastNameSchema,
  firstNameSchema,
  genderSchema,
  emailSchema,
  tokenSchema,
  idSchema,
  idTypeSchema,
  idNumberSchema,
  phoneSchema,
  catalogSchema,
  sizeSchema,
  urlSchema,
  passwordSchema,
  fileuploadSchema,
  fileremoveSchema,
  catalogshapeSchema,
  stringDateSchema,
  nullableIdSchema,
  requiredIdSchema
};