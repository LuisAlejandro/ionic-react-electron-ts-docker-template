import * as yup from 'yup';

import { organizationDetailsSchema as organizationDetailsSchemaBase } from "./Organization";
import { permissionDetailsSchema as permissionDetailsSchemaBase } from "./Permission";
import { roleDetailsSchema as roleDetailsSchemaBase } from "./Role";
import { userDetailsSchema as userDetailsSchemaBase } from "./User";
import { organizationsSchema } from "./Organization";
import { permissionsSchema } from "./Permission";
import { rolesSchema } from "./Role";
import { usersSchema, userDataDetailsSchema } from "./User";
import { idSchema, tokenSchema, emailSchema, requiredIdSchema } from "./misc";


const organizationDetailsSchema = organizationDetailsSchemaBase.shape({
  users: usersSchema,
});

const permissionDetailsSchema = permissionDetailsSchemaBase.shape({
  roles: rolesSchema,
});

const roleDetailsSchema = roleDetailsSchemaBase.shape({
  users: usersSchema,
  permissions: permissionsSchema,
});

const userDetailsSchema = userDetailsSchemaBase.shape({
  organizationId: idSchema,
  organization: organizationDetailsSchemaBase,
  roleId: idSchema,
  role: roleDetailsSchemaBase,
});

const authDataDetailsSchema = userDetailsSchemaBase.shape({
  password: yup.string().strip(),
  password2: yup.string().strip(),
  token: tokenSchema,
  organization: organizationDetailsSchemaBase,
  role: roleDetailsSchemaBase.shape({
    permissions: permissionsSchema,
  }),
});

const loginFormSchema = yup.object({
  email: emailSchema,
  password: yup
    .string()
    .required()
    .min(6)
    .max(30)
    .label('Contraseña')
    .default(''),
})


export {
  organizationDetailsSchema, organizationsSchema,
  permissionDetailsSchema, permissionsSchema,
  roleDetailsSchema, rolesSchema,
  userDetailsSchema, usersSchema,
  authDataDetailsSchema, userDataDetailsSchema,
  requiredIdSchema,
  loginFormSchema
};
