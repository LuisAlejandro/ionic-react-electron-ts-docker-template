import { Method } from 'axios';

import request from 'src/baseplate/request';
import { BaseplateResp, AuthDataType } from 'src/shared/common/types';

import { Constants } from './constants';


const login = (email: string, password: string): Promise<void> => {
  return request({
    url: `${Constants.ApiHost}/login`,
    method: 'POST' as Method,
    headers: { 'Content-Type': 'application/json' },
    data: { email, password }
  }).then((response: BaseplateResp) => {
    if (!response) return;
    const user = response as AuthDataType;
    localStorage.setItem(
      'user', 
      JSON.stringify({
        id: user.id,
        email: user.email,
        avatar: user.avatar,
        firstName: user.firstName,
        lastName: user.lastName,
        token: user.token,
        orgLogo: user.organization.logo,
        orgName: user.organization.name,
        orgId: user.organization.id,
        role: user.role.name,
        permissions: user.role.permissions.map(p => p.name),
      })
    );
    return;
  });
}

export const userService = {
  login,
};
