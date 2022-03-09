import * as yup from 'yup';

import {
  phoneSchema,
  emailSchema,
  idSchema,
  stringDateSchema
} from './misc';


const pickupAddressDetailsSchema = yup
  .object({
    id: idSchema,
    use: yup
      .string()
      .required()
      .min(5)
      .max(256)
      .label('Uso')
      .default(''),
    contactName: yup
      .string()
      .required()
      .min(3)
      .max(256)
      .label('Nombre del Contacto')
      .default(''),
    contactEmail: emailSchema,
    contactPhone: phoneSchema,
    street: yup
      .string()
      .required()
      .min(3)
      .max(256)
      .label('Calle')
      .default(''),
    streetNumber: yup
      .string()
      .required()
      .min(3)
      .max(256)
      .label('Nº Calle')
      .default(''),
    apartment: yup
      .string()
      .required()
      .min(1)
      .max(256)
      .label('N° Depto')
      .default(''),
    district: yup
      .string()
      .required()
      .min(2)
      .max(256)
      .label('Comuna o Municipio')
      .default(''),
    state: yup
      .string()
      .required()
      .min(2)
      .max(256)
      .label('Región o Estado')
      .default(''),
    country: yup
      .string()
      .required()
      .min(2)
      .max(256)
      .label('País')
      .default('CL'),
    reference: yup
      .string()
      .required()
      .max(512)
      .label('Referencia')
      .default(''),
    createdAt: stringDateSchema,
    updatedAt: stringDateSchema,
  });

const pickupAddressesSchema = yup
  .array(pickupAddressDetailsSchema)
  .label("Direcciones de retiro")
  .default([]);


export { pickupAddressDetailsSchema, pickupAddressesSchema };
