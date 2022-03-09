/**
 * Type defined inside this container
*/
import { Except } from 'type-fest';

import {
  UserType as _UserType,
  UserDataType,
} from 'src/shared/common/types';

import { mapDispatchToProps, mapStateToProps } from './index';
import { Actions, Constants } from './constants';


export type UserType = Except<_UserType, typeof Constants.UsersModelExcludes[number]>;

export type InferMappedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
export type ActionType = typeof Actions;
export type SubState = {
  alertMessage: string,
  userData: UserDataType,
  userDetails: UserType,
};
