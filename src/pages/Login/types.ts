/**
 * Type defined inside this container
*/
import { mapDispatchToProps, mapStateToProps } from './index';
import { Actions } from './constants';


export type InferMappedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
export type ActionType = typeof Actions;
export type SubState = {
  alertMessage: string,
  userLoggingIn: boolean,
  userLoggedIn: boolean,
};
