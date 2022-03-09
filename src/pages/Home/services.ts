import { Method } from 'axios';

import request from 'src/baseplate/request';
import { authHeader } from 'src/shared/common/helpers';

import { Constants } from './constants';


const usersConfig = { model: { excludes: Constants.UsersModelExcludes } };

const getUserDetails = (email: string, token: string) => {
  return request({
    url: `${Constants.ApiHost}/self/detail`,
    method: 'GET' as Method,
    headers: authHeader(),
    params: { config: usersConfig, email, token }
  });
}

export const userService = {
  getUserDetails,
};