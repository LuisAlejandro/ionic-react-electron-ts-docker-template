/**
 * Base Namespace for the page
 * Use it wisely, as it affects your pagename
 */
export const NameSpace = 'Admin';

/***
 * Action Definitions - START
 * Action names should be declarative that can be understood.
 * So we would encourage you to use AJAX or STATE names to signify the action done
 * Names to choose - { STATE / FETCH }_{ WORK DONE ? }_{ TARGET }
 * ***/
export const Actions = {
  SET_ALERT: `[Page] -> ${NameSpace}/SET_ALERT`,
  ORGANIZATIONS_REQUEST: `[Page] -> ${NameSpace}/ORGANIZATIONS_REQUEST`,
  ORGANIZATIONS_SUCCESS: `[Page] -> ${NameSpace}/ORGANIZATIONS_SUCCESS`,
  ROLES_REQUEST: `[Page] -> ${NameSpace}/ROLES_REQUEST`,
  ROLES_SUCCESS: `[Page] -> ${NameSpace}/ROLES_SUCCESS`,
  ENTITIES_REQUEST: `[Page] -> ${NameSpace}/ENTITIES_REQUEST`,
  ENTITIES_SUCCESS: `[Page] -> ${NameSpace}/ENTITIES_SUCCESS`,
  CREATE_ENTITIES_REQUEST: `[Page] -> ${NameSpace}/CREATE_ENTITIES_REQUEST`,
  CREATE_ENTITIES_SUCCESS: `[Page] -> ${NameSpace}/CREATE_ENTITIES_SUCCESS`,
  UPDATE_ENTITIES_REQUEST: `[Page] -> ${NameSpace}/UPDATE_ENTITIES_REQUEST`,
  UPDATE_ENTITIES_SUCCESS: `[Page] -> ${NameSpace}/UPDATE_ENTITIES_SUCCESS`,
  DELETE_ENTITIES_REQUEST: `[Page] -> ${NameSpace}/DELETE_ENTITIES_REQUEST`,
  DELETE_ENTITIES_SUCCESS: `[Page] -> ${NameSpace}/DELETE_ENTITIES_SUCCESS`,
}
/*** Action Definitions - END ***/

/** Component Constants - START */
export const Constants = {
  ApiHost: process.env.REACT_APP_API_URL || 'http://api-app.soleitapp.com',
  OrganizationsModelExcludes: [
    'users', 'patients', 'requests', 'doctors',
    'devices', 'materials', 'terminations', 'pickupAddresses',
  ] as const,
  MaterialsModelExcludes: [
    'products',
  ] as const,
  TerminationsModelExcludes: [
    'products',
  ] as const,
  DevicesModelExcludes: [] as const,
  DoctorsModelExcludes: [
    'requests',
  ] as const,
  PickupAddressesModelExcludes: [
    'requests',
  ] as const,
  DeliveryAddressesModelExcludes: [
    'requests', 'patient'
  ] as const,
  PatientsModelExcludes: [
    'requests', 'deliveryAddresses', 'alignments',
    'scanners', 'products', 'insoles'
  ] as const,
  UsersModelExcludes: [
    'requests',
  ] as const,
  RolesModelExcludes: [
    'users', 'permissions',
  ] as const,
}
/** Component Constants - END */
