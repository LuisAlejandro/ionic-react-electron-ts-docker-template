import * as yup from 'yup';

import { UserDataType } from 'src/shared/common/types';

import {
  emailSchema,
  idNumberSchema,
  genderSchema,
  phoneSchema,
  idTypeSchema,
  lastNameSchema,
  firstNameSchema,
  tokenSchema,
  idSchema,
  stringDateSchema
} from './misc';


const initialUser = JSON.stringify({
  id: '', firstName: '', lastName: '', email: '',
  token: '', avatar: '', orgLogo: '', orgName: '',
  orgId: '', role: '', permissions: [],
});
const localUser = localStorage.getItem('user');
const user = JSON.parse(localUser || initialUser) as UserDataType;
console.log(user);
const userDetailsSchema = yup
  .object({
    id: idSchema,
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    idType: idTypeSchema,
    idNumber: idNumberSchema,
    phone: phoneSchema,
    gender: genderSchema,
    email: emailSchema,
    avatar: yup
      .string()
      .optional()
      .url()
      .label('Avatar')
      .default(''),
    password: yup
      .string()
      .required()
      .min(6)
      .max(30)
      .label('Contraseña')
      .default(''),
    password2: yup
      .string()
      .optional()
      .nullable()
      .oneOf([
        yup.ref('password'),
        null
      ], 'Las contraseñas deben coincidir')
      .label('Repetir Contraseña')
      .default(''),
    createdAt: stringDateSchema,
    updatedAt: stringDateSchema,
  });
  
const userDataDetailsSchema = yup
  .object({
    id: idSchema
      .default(user.id || ''),
    firstName: firstNameSchema
      .default(user.firstName || ''),
    lastName: lastNameSchema
      .default(user.lastName || ''),
    email: emailSchema
      .default(user.email || ''),
    token: tokenSchema
      .default(user.token || ''),
    avatar: yup
      .string()
      .optional()
      .url()
      .label('Avatar')
      .default(user.avatar || ''),
    orgLogo: yup
      .string()
      .required()
      .url()
      .label('Logo de la Organización')
      .default(user.orgLogo || ''),
    orgName: yup
      .string()
      .required()
      .label('Nombre de la Organización')
      .default(user.orgName || ''),
    orgId: yup
      .string()
      .required()
      .label('Id de la Organización')
      .default(user.orgId || ''),
    role: yup
      .string()
      .required()
      .label('Rol')
      .default(user.role || ''),
    permissions: yup
      .array(yup
        .string()
        .required()
        .min(2)
        .max(256)
        .label('Permiso')
        .default('')
      )
      .label("Permisos")
      .default(user.permissions || [])
  });

const usersSchema = yup
  .array(userDetailsSchema)
  .label("Usuarios")
  .default([]);


export { userDetailsSchema, userDataDetailsSchema, usersSchema };
