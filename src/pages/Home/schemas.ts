import * as yup from 'yup';

import { userDetailsSchema } from 'src/shared/common/schemas';

import { Constants } from './constants';


// Schemas
// ------------------------------------------------------------------------------------------------
export const homeUserSchema = userDetailsSchema.omit(Constants.UsersModelExcludes as any);

export const homeUsersSchema = yup.array(homeUserSchema).default([]);


// Initial values
// ------------------------------------------------------------------------------------------------
export const homeUserInitialValues = homeUserSchema.getDefault();

export const homeUsersInitialValues = homeUsersSchema.getDefault();
