import * as yup from 'yup';

import { idSchema, stringDateSchema } from './misc';


const insoleDetailsSchema = yup
  .object({
    id: idSchema,
    title: yup
      .string()
      .required()
      .min(3)
      .max(256)
      .label('Título (Calzado)')
      .default(''),
    brand: yup
      .string()
      .required()
      .min(3)
      .max(256)
      .label('Marca (Calzado)')
      .default(''),
    model: yup
      .string()
      .required()
      .min(3)
      .max(256)
      .label('Modelo (Calzado)')
      .default(''),
    sizeConvertion: yup
      .string()
      .required()
      .oneOf([
        'us',
        'uk',
        'cl',
        'eu',
        'mm'
      ], '"Sistema (Calzado)" debe ser uno de los siguientes valores: US, UK, CL, EU, MM')
      .label('Sistema (Calzado)')
      .default(''),
    sizeNumber : yup
      .number()
      .required()
      .positive()
      .label('Talla (Calzado)')
      .default(0),
    type: yup
      .string()
      .required()
      .oneOf([
        'Zapatillas de vestir',
        'Zapatillas deportivas',
        'Zapatillas deporte especializada',
        'Zapato formal masculino',
        'Zapato formal femenino',
        'Otro'
      ], '"Tipo (Calzado)" debe ser uno de los siguientes valores: Zapatillas de vestir, Zapatillas deportivas, Zapatillas deporte especializada, Zapato formal masculino, Zapato formal femenino, Otro')
      .label('Tipo (Calzado)')
      .default(''),
    zonaArco: yup
      .string()
      .required()
      .oneOf([
        'realce',
        'plano'
      ], '"Zona del arco (Calzado)" debe ser uno de los siguientes valores: Tiene un realce, Es plano')
      .label('Zona del arco (Calzado)')
      .default(''),
    retiroPlantillaOriginal: yup
      .string()
      .required()
      .oneOf([
        'si',
        'no'
      ], '"Retiro de la plantilla original (Calzado)" debe ser uno de los siguientes valores: Si, No')
      .label('Retiro de la plantilla original (Calzado)')
      .default(''),
    tipoEmpeine: yup
      .string()
      .required()
      .oneOf([
        'bajo',
        'normal',
        'alto'
      ], '"Tipo de empeine (Calzado)" debe ser uno de los siguientes valores: Bajo, Normal, Alto')
      .label('Tipo de empeine (Calzado)')
      .default(''),
    shape: yup
      .boolean()
      .required()
      .label('Horma base (Calzado)')
      .default(false),
    catalogo: yup
      .string()
      .when('shape', { is: false, then: (schema) => schema.strip() })
      .label('Catálogo de horma base (Calzado)')
      .default(''),
    sizeNumberCatalogo: yup
      .string()
      .when('shape', { is: false, then: (schema) => schema.strip() })
      .label('Talla de horma base (Calzado)')
      .default(''),
    customShape: yup
      .boolean()
      .required()
      .label('Horma personalizada (Calzado)')
      .default(false),
    largo: yup
      .number()
      .positive()
      .when('customShape', { is: false, then: (schema) => schema.strip() })
      .label('Largo horma (Calzado)')
      .default(0),
    anchoBola: yup
      .number()
      .positive()
      .when('customShape', { is: false, then: (schema) => schema.strip() })
      .label('Ancho bola (Calzado)')
      .default(0),
    anchoTalon:  yup
      .number()
      .positive()
      .when('customShape', { is: false, then: (schema) => schema.strip() })
      .label('Ancho talón (Calzado)')
      .default(0),
    tipoPunta: yup
      .string()
      .oneOf([
        'sharp',
        'rounded',
        'square'
      ], '"Tipo de punta (Calzado)" debe ser uno de los siguientes valores: Puntada, Redonda, Cuadrada')
      .when('customShape', { is: false, then: (schema) => schema.strip() })
      .label('Tipo de punta (Calzado)')
      .default(''),
    createdAt: stringDateSchema,
    updatedAt: stringDateSchema,
  });

const insolesSchema = yup
  .array(insoleDetailsSchema)
  .label("Plantillas")
  .default([]);


export { insoleDetailsSchema, insolesSchema };
