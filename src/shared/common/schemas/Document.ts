import * as yup from 'yup';


const documentDetailsSchema = yup
  .object({
    localname: yup
      .string()
      .required()
      .min(1)
      .max(256)
      .label('Nombre local')
      .default(''),
    filename: yup
      .string()
      .required()
      .min(1)
      .max(256)
      .label('Nombre de archivo')
      .default(''),
    type: yup
      .string()
      .required()
      .oneOf([
        'application/pdf',
        'image/jpeg',
      ], '"Tipo de documento" debe ser uno de los siguientes valores: application/pdf, image/jpeg')
      .label('Tipo de documento')
      .default(''),
    url: yup
      .string()
      .required()
      .url()
      .label('URL')
      .default(''),
  });

const documentsSchema = yup
  .array(documentDetailsSchema)
  .min(1, 'Debe agregarse al menos un documento')
  .max(5, 'Solo puede agregarse una cantidad máxima de 5 documentos')
  .label("Documentos")
  .default([]);


export { documentsSchema, documentDetailsSchema };