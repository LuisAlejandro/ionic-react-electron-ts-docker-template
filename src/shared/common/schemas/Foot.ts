import * as yup from 'yup';


const footDetailsSchema = yup
  .object({
    enabled: yup
      .boolean()
      .required()
      .label('Habilitado')
      .default(false),
    largo: yup
      .number()
      .positive()
      .min(1)
      .max(1000)
      .when('enabled', { is: false, then: (schema) => schema.strip() })
      .label('Largo (mm)')
      .default(0),
    anchoBola: yup
      .number()
      .positive()
      .min(1)
      .max(1000)
      .when('enabled', { is: false, then: (schema) => schema.strip() })
      .label('Ancho bola del pie (mm)')
      .default(0),
    alturaNavicBipedo: yup
      .number()
      .positive()
      .min(1)
      .max(1000)
      .when('enabled', { is: false, then: (schema) => schema.strip() })
      .label('Altura navicular bípedo (mm)')
      .default(0),
    alturaNavicSedente: yup
      .number()
      .positive()
      .min(1)
      .max(1000)
      .when('enabled', { is: false, then: (schema) => schema.strip() })
      .label('Altura navicular sedente (mm)')
      .default(0),
    formaDedos: yup
      .string()
      .oneOf([
        'none',
        'normal',
        'garra',
        'martillo',
      ], '"Forma de dedos" debe ser uno de los siguientes valores: No especificado, Normal, Valgo, Varo')
      .when('enabled', { is: false, then: (schema) => schema.strip() })
      .label('Forma de dedos')
      .default('none'),
    alineacionRodillas: yup
      .string()
      .oneOf([
        'none',
        'normal',
        'valgo',
        'varo',
      ], '"Alineación de rodillas" debe ser uno de los siguientes valores: No especificado, Normal, Garra, Martillo')
      .when('enabled', { is: false, then: (schema) => schema.strip() })
      .label('Alineación de rodillas')
      .default('none'),
    movimientoCalcaneoDinamico: yup
      .string()
      .oneOf([
        'none',
        'normal',
        'exacerbado',
      ], '"Movimiento calcáneo dinámico" debe ser uno de los siguientes valores: No especificado, Normal, Exacerbado')
      .when('enabled', { is: false, then: (schema) => schema.strip() })
      .label('Movimiento calcáneo dinámico')
      .default('none'),
  });

const feetSchema = yup
  .array(footDetailsSchema)
  .label("Pies")
  .default([]);


export { footDetailsSchema, feetSchema };
