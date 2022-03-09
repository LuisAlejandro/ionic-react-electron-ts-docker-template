import * as yup from 'yup';


// const painPointsDetailsSchema = yup
//   .object({
//     name: yup
//       .string()
//       .required()
//       .oneOf([
//         'right-leg-hallux',
//         'right-leg-2-dedo',
//         'right-leg-3-dedo',
//         'right-leg-4-dedo',
//         'right-leg-5-dedo',
//         'right-leg-talon-anterior',
//         'right-leg-talon-posterior',
//         'right-leg-arco-medial',
//         'right-leg-arco-central',
//         'right-leg-arco-lateral',
//         'right-leg-1-mtt',
//         'right-leg-2-mtt',
//         'right-leg-3-mtt',
//         'right-leg-4-mtt',
//         'right-leg-5-mtt',
//         'right-leg-centro-talon',
//         'right-leg-fibulares',
//         'right-leg-talon',
//         'right-leg-tobillo-antero-lateral',
//         'right-leg-tibial-anterior',
//         'right-leg-pie-lateral',
//         'right-leg-tibia-medial',
//         'right-leg-dorso-pie-lateral',
//         'right-leg-tibia-proximal',
//         'right-leg-tobillo-anterior',
//         'right-leg-dorso-pie-medial',
//         'right-leg-tibia-distal',
//         'right-leg-pie-medial',
//         'right-leg-talon-medial',
//         'right-leg-talon-lateral',
//         'right-leg-pantorrilla',
//         'right-leg-dedos',
//         'right-leg-tendon-aquileano',
//         'left-leg-hallux',
//         'left-leg-2-dedo',
//         'left-leg-3-dedo',
//         'left-leg-4-dedo',
//         'left-leg-5-dedo',
//         'left-leg-talon-anterior',
//         'left-leg-talon-posterior',
//         'left-leg-arco-medial',
//         'left-leg-arco-central',
//         'left-leg-arco-lateral',
//         'left-leg-1-mtt',
//         'left-leg-2-mtt',
//         'left-leg-3-mtt',
//         'left-leg-4-mtt',
//         'left-leg-5-mtt',
//         'left-leg-centro-talon',
//         'left-leg-fibulares',
//         'left-leg-talon',
//         'left-leg-tobillo-antero-lateral',
//         'left-leg-tibial-anterior',
//         'left-leg-pie-lateral',
//         'left-leg-tibia-medial',
//         'left-leg-dorso-pie-lateral',
//         'left-leg-tibia-proximal',
//         'left-leg-tobillo-anterior',
//         'left-leg-dorso-pie-medial',
//         'left-leg-tibia-distal',
//         'left-leg-pie-medial',
//         'left-leg-talon-medial',
//         'left-leg-talon-lateral',
//         'left-leg-pantorrilla',
//         'left-leg-dedos',
//         'left-leg-tendon-aquileano',
//       ])
//       .label('Nombre')
//       .default(''),
//     label: yup
//       .string()
//       .required()
//       .min(2)
//       .max(256)
//       .label('Etiqueta')
//       .default(''),
//     severity: yup
//       .string()
//       .required()
//       .oneOf([
//         'leve',
//         'normal',
//         'severo',
//       ])
//       .label('Severidad')
//       .default(''),
//   });
const painPointsDetailsSchema = yup
  .object()
  .default({});

const painPointsSchema = yup
  .array(painPointsDetailsSchema)
  .label("Puntos de dolor")
  .default([]);


export { painPointsSchema, painPointsDetailsSchema };