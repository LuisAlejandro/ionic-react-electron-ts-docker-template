/** 
 * Base Namespace for the page
 * Use it wisely, as it affects your pagename
 */
export const NameSpace = 'Home';

/*** 
 * Action Definitions - START 
 * Action names should be declarative that can be understood. 
 * So we would encourage you to use AJAX or STATE names to signify the action done
 * Names to choose - { STATE / FETCH }_{ WORK DONE ? }_{ TARGET }
 * ***/
export const Actions = {
  SET_ALERT: `[Page] -> ${NameSpace}/SET_ALERT`,
  USER_DETAILS_REQUEST: `[Page] -> ${NameSpace}/USER_DETAILS_REQUEST`,
  USER_DETAILS_SUCCESS: `[Page] -> ${NameSpace}/USER_DETAILS_SUCCESS`,
}
/*** Action Definitions - END ***/

/** Component Constants - START */
export const Constants = {
  ApiHost: process.env.REACT_APP_API_URL,
  UsersModelExcludes: [
    'organization', 'role',
  ] as const,
}
/** Component Constants - END */
