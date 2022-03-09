/** 
 * Base Namespace for the page
 * Use it wisely, as it affects your pagename
 */
export const NameSpace = 'Login';

/*** 
 * Action Definitions - START 
 * Action names should be declarative that can be understood. 
 * So we would encourage you to use AJAX or STATE names to signify the action done
 * Names to choose - { STATE / FETCH }_{ WORK DONE ? }_{ TARGET }
 * ***/
export const Actions = {
  SET_ALERT: `[Page] -> ${NameSpace}/SET_ALERT`,
  USER_LOGIN_FORM_SUBMIT: `[Page] -> ${NameSpace}/USER_LOGIN_FORM_SUBMIT`,
  USER_LOGIN_REQUEST: `[Page] -> ${NameSpace}/USER_LOGIN_REQUEST`,
  USER_LOGIN_SUCCESS: `[Page] -> ${NameSpace}/USER_LOGIN_SUCCESS`,
  USER_LOGIN_FAILURE: `[Page] -> ${NameSpace}/USER_LOGIN_FAILURE`,
  USER_LOGOUT: `[Page] -> ${NameSpace}/USER_LOGOUT`
}
/*** Action Definitions - END ***/

/** Component Constants - START */
export const Constants = {
  ApiHost: process.env.REACT_APP_API_URL,
}
/** Component Constants - END */
