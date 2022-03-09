import lodashIsEqual from 'lodash/isEqual';
import { AsYouType } from 'libphonenumber-js';
import { FieldErrors, FieldValues } from 'react-hook-form';


export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const importAll = (r: any) => {
  let images: any = {};
  r.keys().map((item: any, index: any) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

export const indicationImages = importAll(require.context('../../assets/images/svg/indications/', false, /\.(svg)$/));
export const pathologyImages = importAll(require.context('../../assets/images/svg/pathologies/', false, /\.(svg)$/));
export const findingImages = importAll(require.context('../../assets/images/svg/pathologies/', false, /\.(svg)$/));

export const validateEmail = (email: string): boolean => {
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}

export const formatRut = (rut: string): string => {
  if (!rut) return rut;
  rut = rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase();
  let result = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1)
  for (let i = 4; i < rut.length; i += 3) {
    result = rut.slice(-3 - i, -i) + '.' + result
  }
  return result
}

export const formatPhone = (phonestr: string) => {
  if (!phonestr) return phonestr;
  const digits = (phonestr.match(/\d+/g) || []).join('').substr(0, 20);
  return new AsYouType('CL').input(digits);
};

export const authHeader = (): HeadersInit => {
  // return authorization header with jwt token
  let headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  const user = JSON.parse(localStorage.getItem('user') as string);
  if (user && user.token) {
    headers['Authorization'] = 'Bearer ' + user.token;
  }
  return headers;
}

export const pressureInterpolateColor = (opaque: any, context: any) => {
  const d = context.dataset.data;
  const i = context.dataIndex;
  if (d.length == 0 || i > d.length - 1) return 'rgba(0,0,0,1)';
	let r, g, b = 0;
  const a = 0.7;
  const perc = (d[i].p / (200 * 0.1)) * 100;
	if (perc < 50) {
		g = 255;
		r = Math.round(5.1 * perc);
	} else {
		r = 255;
		g = Math.round(510 - 5.10 * perc);
	}
  return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}

export class UserMediaDetector {

  static Kinds = {
    VideoInput: 'videoinput',
    AudioInput: 'audioinput',
    AudioOutput: 'audioinput'
  };

  // Returns info on all user media devices.
  async devices() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      throw(Error('UserMediaDetector getDevices failed: enumerateDevices is not supported'));
    }

    const mediaDevices = await navigator.mediaDevices.enumerateDevices();

    return mediaDevices.map(
      ({ deviceId, groupId, kind, label }) => ({ deviceId, groupId, kind, label })
    );
  }

  // Returns permitted status of given user media.
  async permitted(kind: any) {
    if (!kind || !Object.values(UserMediaDetector.Kinds).includes(kind)) {
      throw(Error(`UserMediaDetector permitted failed: kind ${kind} is not supported`));
    }

    const devices = await this.devices();

    // Note: The presence of a `label` on a device indicates that it
    //   the device is active or persistent permissions are granted.
    const permitted = !!devices.find(
      device => device.kind === kind && !!device.label
    );

    return permitted;
  }

  // Returns boolean value designating if all given media kinds are permitted.
  async permittedAll(kinds = Object.values(UserMediaDetector.Kinds)) {
    const kindsArray = Array.isArray(kinds) ? kinds : Array.of(kinds);
    const permissionStates = await Promise.all(kindsArray.map(kind => this.permitted(kind)));

    return permissionStates.every(isPermitted => isPermitted);
  }
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

export const filterStepErrors = (errors: FieldErrors<FieldValues>, steps: any, activeStep: number) => {
  return Object.keys(errors)
    .filter(key => {
      if (activeStep == 1 || activeStep == 4) {
        return key == 'products';
      } else {
        return Object.keys(steps[activeStep].meta.initialValues).includes(key);
      }
    })
    .reduce((err: FieldErrors<FieldValues>, key: string) => {
      err[key] = errors[key];
      return err;
    }, {});
};

export const lastSeenStep = (data: any, steps: any) => {
  for (let i = steps.length - 1; i >= 0; i--) {
    const stepInitialData = steps[i].meta.initialValues as any;
    for (const key of Object.keys(stepInitialData)) {
      const initialData = key in stepInitialData ? stepInitialData[key] : undefined;
      const currentData = key in data ? data[key] : initialData;
      if (!lodashIsEqual(currentData, initialData)) {
        return i;
      }
    }
  }
  return 0;
};
