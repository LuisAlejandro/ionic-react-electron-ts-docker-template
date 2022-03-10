import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';

import { BaseplateResp } from 'src/shared/common/types';


type IonicErrorParams = {
  status: number,
  name: string,
  message: string,
  details: string,
};

class IonicError extends Error {
  status = 500;
  constructor({ status, name, message, details }: IonicErrorParams) {
    super(`[status: ${status}] ${name}\n${message}\n${details}`);
    this.status = status;
    this.name = name;
  }
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(options: AxiosRequestConfig): Promise<BaseplateResp> {
  return axios({ ...options, timeout: 50 * 1000 })
    .catch(catchError)
    .then(checkStatus)
    .then(handleResponse);
}

/**
 * Throws an error
 *
 * @param  {object} error   A response from a network request
 *
 * @return {object|undefined} Throws an error
 */
 function catchError(err: AxiosError) {
  const errorConfig = {
    status: 500,
    name: '',
    message: '',
    details: '',
  };
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (err.response.status === 401) {
      if (err.config.url && err.config.url !== '/login') {
        // auto logout if 401 response returned from api
        localStorage.removeItem('user');
        location.reload();
        return;
      }
    }
    errorConfig.name = 'ApiServerError';
    errorConfig.message = err.response.data.message;
    errorConfig.details = err.response.data.details;
    errorConfig.status = err.response.status;
  } else if (err.request) {
    // The request was made but no response was received
    const errorToJson = err.toJSON() as { message: string };
    errorConfig.name = 'NetworkError';
    errorConfig.message = errorToJson.message;
  } else {
    // Something else happened in setting up the request that triggered an Error
    errorConfig.name = 'FrontendError';
    errorConfig.message = err.message;
  }
  throw new IonicError(errorConfig);
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response: void | AxiosResponse): BaseplateResp {
  if (response) {
    if (response.status === 204 || response.status === 205) {
      return null;
    } else if (response.status >= 200 && response.status < 300) {
      return response;
    }
    throw new IonicError({
      status: response.status,
      name: 'UnknownError',
      message: response.data.message,
      details: response.data.details,
    });
  }
  return null;
}

/**
 * Parses the JSON / Text returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object | string} The parsed JSON or Text from the request
 */
 function handleResponse(response: BaseplateResp): BaseplateResp {
  if (!(response && response.hasOwnProperty('headers') && response.hasOwnProperty('data'))) return null;
  const r = response as AxiosResponse;
  const contentType = r.headers['content-type'];
  if (contentType) {
    if (contentType.indexOf('text/plain') !== -1) {
      return JSON.stringify(r.data);
    }
  }
  return r.data;
}
