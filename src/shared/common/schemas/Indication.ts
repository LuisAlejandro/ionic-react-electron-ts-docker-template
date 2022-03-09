import * as yup from 'yup';


// const footSchema = yup
//   .mixed()
//   .test(
//     'footSchema',
//     '',
//     (value, context) => {
//       let schema;
//       if ([
//         'descarga-de-talon',
//         'arco',
//         'realce-retrocapital-domo-oliva',
//         'barra-retrocapital',
//         'cuna-lateral-posterior',
//         'cuna-medial-posterior',
//         'cuna-lateral-anterior',
//         'talonera',
//         'copa',
//         'manoli',
//       ].includes(context.parent.type)) {
//         schema = yup
//           .boolean();
//       } else if ([
//         'descarga-de-metatarsos',
//       ].includes(context.parent.type)) {
//         schema = yup
//           .object({
//             '1o': yup
//               .boolean(),
//             '2o': yup
//               .boolean(),
//             '3o': yup
//               .boolean(),
//             '4o': yup
//               .boolean(),
//             '5o': yup
//               .boolean(),
//           });
//       } else if ([
//         'otro',
//       ].includes(context.parent.type)) {
//         schema = yup
//           .string()
//           .max(256);
//       } else {
//         schema = yup
//           .string()
//           .strip();
//       }
//       return schema.isValid(value) || context.createError({
//         message: 'footSchema debe tener el formato correcto',
//         path: 'indications',
//       });
//     }
//   )
//   .default(false);

// const indicationDetailsSchema = yup
//   .object({
//     type: yup
//       .string()
//       .required()
//       .oneOf([
//         'descarga-de-metatarsos',
//         'descarga-de-talon',
//         'plantilla-molde',
//         'plantilla-confort',
//         'plantilla-ucbl',
//         'apoyo-total',
//         'otro',
//         'arco',
//         'realce-retrocapital-domo-oliva',
//         'barra-retrocapital',
//         'cuna-lateral-posterior',
//         'cuna-medial-posterior',
//         'cuna-lateral-anterior',
//         'talonera',
//         'copa',
//         'manoli',
//       ])
//       .label('Tipo')
//       .default(''),
//     label: yup
//       .string()
//       .required()
//       .min(2)
//       .max(256)
//       .label('Nombre')
//       .default(''),
//     description: yup
//       .string()
//       .required()
//       .min(2)
//       .max(256)
//       .label('Descripción')
//       .default(''),
//     leftFoot: footSchema,
//     rightFoot: footSchema,
//     leftFootHeight: yup
//       .number()
//       .integer()
//       .positive()
//       .required()
//       .min(0)
//       .max(1000)
//       .label('Altura de pie izquierdo')
//       .default(0),
//     rightFootHeight:  yup
//       .number()
//       .integer()
//       .positive()
//       .required()
//       .min(0)
//       .max(1000)
//       .label('Altura de pie derecho')
//       .default(0),
//   });
const indicationDetailsSchema = yup
  .object()
  .default({});

const indicationsSchema = yup
  .array(indicationDetailsSchema)
  .max(10, 'Solo puede agregarse una cantidad máxima de 10 indicaciones')
  .label("Indicaciones")
  .default([]);


export { indicationsSchema, indicationDetailsSchema };
