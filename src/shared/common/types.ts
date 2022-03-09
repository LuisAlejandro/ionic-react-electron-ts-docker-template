import * as yup from 'yup';
import { Except } from 'type-fest';

import {
  userDetailsSchema,
  organizationDetailsSchema,
  roleDetailsSchema,
  userDataDetailsSchema,
  authDataDetailsSchema,
  loginFormSchema
} from './schemas';


export type ValueOf<T> = T[keyof T];

export type ActionTags<T, U> = {
  type: ValueOf<T>;
  payLoad: { [key: string]: any } | U;
};

export type InjectedReducers = {
  [key: string]: <T>(state: T, actions: ActionTags<any, any>) => any
}

export type EProps = {
  eProps: { [key: string]: any }
};

export type BaseplateResp = string | object | object[] | null;

export type UserType = yup.InferType<typeof userDetailsSchema>;
export type OrganizationType = yup.InferType<typeof organizationDetailsSchema>;
export type RoleType = yup.InferType<typeof roleDetailsSchema>;
export type AuthDataType = Except<yup.InferType<typeof authDataDetailsSchema>, 'password' | 'password2'>;

export type LoginFormType = yup.InferType<typeof loginFormSchema>;

export type UserDataType = {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  token: string,
  avatar: string,
  orgLogo: string,
  orgName: string,
  orgId: string,
  role: string,
  permissions: string[],
};