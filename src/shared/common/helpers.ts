import { AxiosRequestHeaders } from "axios";


export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const authHeader = () => {
  // return authorization header with jwt token
  let headers: AxiosRequestHeaders = {
    'Content-Type': 'application/json'
  };
  const user = JSON.parse(localStorage.getItem('user') as string);
  if (user && user.token) {
    headers['Authorization'] = 'Bearer ' + user.token;
  }
  return headers;
}

export const flattenObject = (ob: any) => {
  var toReturn: any = {};
  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;
    if ((typeof ob[i]) == 'object' && ob[i] !== null) {
      var flatObject = flattenObject(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;
        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};
