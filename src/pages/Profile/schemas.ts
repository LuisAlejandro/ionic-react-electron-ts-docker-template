import * as yup from 'yup';

import { userDetailsSchema } from 'src/shared/common/schemas';

import { Constants } from './constants';


// Schemas
// ------------------------------------------------------------------------------------------------
export const profileUserSchema = userDetailsSchema.omit(Constants.UsersModelExcludes as any);

export const profileUsersSchema = yup.array(profileUserSchema).default([]);


// Initial values
// ------------------------------------------------------------------------------------------------
export const profileUserInitialValues = profileUserSchema.getDefault();

export const profileUsersInitialValues = profileUsersSchema.getDefault();
