import { Method } from 'axios';

import request from 'src/baseplate/request';
import { authHeader } from 'src/shared/common/helpers';

import { Constants } from './constants';


const getRequestConfig = (type: string) =>
  type == 'organizations' ?
    { model: { excludes: Constants.OrganizationsModelExcludes } } :
  type == 'roles' ?
    { model: { excludes: Constants.RolesModelExcludes } } :
  type == 'permissions' ?
    { model: { excludes: Constants.PermissionsModelExcludes } } :
    { model: { excludes: Constants.UsersModelExcludes } };

const getOrganizations = (email: string, token: string) => {
  return request({
    url: `${Constants.ApiHost}/organizations`,
    method: 'GET' as Method,
    headers: authHeader(),
    params: { config: getRequestConfig('organizations'), email, token }
  });
};

const getRoles = (email: string, token: string) => {
  return request({
    url: `${Constants.ApiHost}/roles`,
    method: 'GET' as Method,
    headers: authHeader(),
    params: { config: getRequestConfig('roles'), email, token }
  });
};

const getEntities = (type: string, email: string, token: string) => {
  return request({
    url: `${Constants.ApiHost}/${type}`,
    method: 'GET' as Method,
    headers: authHeader(),
    params: { config: getRequestConfig(type), email, token }
  });
};

const createEntities = (type: string, email: string, token: string, values: string) => {
  return request({
    url: `${Constants.ApiHost}/${type}/create`,
    method: 'POST' as Method,
    headers: authHeader(),
    data: { config: getRequestConfig(type), email, token, values }
  });
};

const updateEntities = (type: string, email: string, token: string, id: string, values: string) => {
  return request({
    url: `${Constants.ApiHost}/${type}/update`,
    method: 'PUT' as Method,
    headers: authHeader(),
    data: { config: getRequestConfig(type), email, token, id, values }
  });
};

const deleteEntities = (type: string, email: string, token: string, id: string ) => {
  return request({
    url: `${Constants.ApiHost}/${type}/delete`,
    method: 'DELETE' as Method,
    headers: authHeader(),
    data: { config: getRequestConfig(type), email, token, id }
  });
};


export const adminService = {
  getOrganizations,
  getRoles,
  getEntities,
  createEntities,
  updateEntities,
  deleteEntities,
};
