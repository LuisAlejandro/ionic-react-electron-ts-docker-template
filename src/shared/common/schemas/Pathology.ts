import * as yup from 'yup';


// const footSchema = yup
//   .mixed()
//   .test(
//     'footSchema',
//     '',
//     (value, context) => {
//       let schema;
//       if ([
//         'fascitis-plantar',
//         'talalgia',
//         'hallux-valgus',
//         'sesamoiditis',
//         'neuroma-morton',
//         'periostitis',
//         'sobrecarga-metatarsos',
//         'navicular-accesorio',
//         'pie-bott',
//         'espolon-calcaneo',
//         'fibroma-plantar',
//         'juanete-de-sastre-5o',
//         'rigidez-generalizada-del-pie',
//         'inestabilidad-lateral-del-pie',
//         'callosidades-en-hallux',
//         'callosidades-en-talon',
//       ].includes(context.parent.type)) {
//         schema = yup
//           .boolean();
//       } else if ([
//         'dedo-martillo',
//         'dedos-en-garra',
//         'rotura-placa-plantar',
//         'enfermedad-de-freiberg',
//         'callosidades-en-ortejos',
//         'metatarsalgia',
//         'callosidades-en-metatarsos',
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
//         'tipo-de-pie',
//         'alineacion-de-retropie',
//         'alineacion-de-rodilla',
//         'tipo-de-pisada',
//         'pinzamiento-tibio-astragalino',
//         'post-quirurgico',
//         'edema-oseo',
//         'artrosis',
//         'otro',
//         'tendinopatia',
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
//         path: 'pathologies',
//       });
//     }
//   )
//   .default(false);

// const pathologyDetailsSchema = yup
//   .object({
//     type: yup
//       .string()
//       .required()
//       .oneOf([
//         'tipo-de-pie',
//         'alineacion-de-retropie',
//         'alineacion-de-rodilla',
//         'tipo-de-pisada',
//         'pinzamiento-tibio-astragalino',
//         'post-quirurgico',
//         'edema-oseo',
//         'artrosis',
//         'otro',
//         'tendinopatia',
//         'dedo-martillo',
//         'dedos-en-garra',
//         'rotura-placa-plantar',
//         'enfermedad-de-freiberg',
//         'callosidades-en-ortejos',
//         'metatarsalgia',
//         'callosidades-en-metatarsos',
//         'fascitis-plantar',
//         'talalgia',
//         'hallux-valgus',
//         'sesamoiditis',
//         'neuroma-morton',
//         'periostitis',
//         'sobrecarga-metatarsos',
//         'navicular-accesorio',
//         'pie-bott',
//         'espolon-calcaneo',
//         'fibroma-plantar',
//         'juanete-de-sastre-5o',
//         'rigidez-generalizada-del-pie',
//         'inestabilidad-lateral-del-pie',
//         'callosidades-en-hallux',
//         'callosidades-en-talon',
//         'pie-diabetico',
//         'charcott-marie-tooth',
//         'dismetria-de-extremidades',
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
//     longestLeg: yup
//       .string()
//       .oneOf([
//         'left',
//         'right',
//       ], '"Pierna más larga" debe ser uno de los siguientes valores: Left, Right')
//       .when('type', {
//         is: 'dismetria-de-extremidades',
//         otherwise: (schema) => schema.strip(),
//       })
//       .label('Pierna más larga')
//       .default(''),
//     legDiff:  yup
//       .number()
//       .integer()
//       .positive()
//       .min(0)
//       .max(1000)
//       .when('type', {
//         is: 'dismetria-de-extremidades',
//         otherwise: (schema) => schema.strip(),
//       })
//       .label('Diferencia')
//       .default(0),
//   });
const pathologyDetailsSchema = yup
  .object()
  .default({});

const pathologiesSchema = yup
  .array(pathologyDetailsSchema)
  .max(10, 'Solo puede agregarse una cantidad máxima de 10 patologías')
  .label("Patologías")
  .default([]);


export { pathologiesSchema, pathologyDetailsSchema };
