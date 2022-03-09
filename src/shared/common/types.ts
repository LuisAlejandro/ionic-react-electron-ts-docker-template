import * as yup from 'yup';
import { Except } from 'type-fest';
import { useForm } from 'react-hook-form';

import {
  userDetailsSchema,
  doctorDetailsSchema,
  terminationDetailsSchema,
  organizationDetailsSchema,
  materialDetailsSchema,
  deviceDetailsSchema,
  patientDetailsSchema,
  roleDetailsSchema,
  userDataDetailsSchema,
  requestDetailsSchema,
  statusDetailsSchema,
  authDataDetailsSchema,
  alignmentDetailsSchema,
  scannerDetailsSchema,
  productDetailsSchema,
  insoleDetailsSchema,
  pickupAddressDetailsSchema,
  deliveryAddressDetailsSchema,
  painPointsDetailsSchema,
  pathologyDetailsSchema,
  findingDetailsSchema,
  indicationDetailsSchema,
} from './schemas';


export type ValueOf<T> = T[keyof T];

export type ActionTags<T, U> = {
  type: ValueOf<T>;
  payLoad: { [key: string]: any } | U;
};

export type InjectedReducers = {
  [key: string]: <T>(state: T, actions: ActionTags<any, any>) => any
}

export type EProps = {
  eProps: { [key: string]: any }
};

export type BaseplateForm = ReturnType<typeof useForm>;

/** Contains the custom response type  */
export type BaseplateResp = string | object | object[] | null;

export type Catalog = {
  apiData: { [key: string]: any },
};

export type Shape = {
  apiData: { [key: string]: any },
};

export type RawScannerDetails = {
  content: any[],
};

export type SocketData = {
  i: number;
  x_max: number;
  y_max: number;
  frame: PointData[];
};

export type FrameData = {
  x_max: number;
  y_max: number;
  frame: {
    x: number;
    y: number;
    r: number;
    p: number;
  }[];
};

export type UserType = yup.InferType<typeof userDetailsSchema>;
export type DoctorType = yup.InferType<typeof doctorDetailsSchema>;
export type TerminationType = yup.InferType<typeof terminationDetailsSchema>;
export type OrganizationType = yup.InferType<typeof organizationDetailsSchema>;
export type MaterialType = yup.InferType<typeof materialDetailsSchema>;
export type DeviceType = yup.InferType<typeof deviceDetailsSchema>;
export type PickupAddressType = yup.InferType<typeof pickupAddressDetailsSchema>;
export type DeliveryAddressType = yup.InferType<typeof deliveryAddressDetailsSchema>;
export type PatientType = yup.InferType<typeof patientDetailsSchema>;

export type RoleType = yup.InferType<typeof roleDetailsSchema>;

export type UserDataType = yup.InferType<typeof userDataDetailsSchema>;
export type AuthDataType = Except<yup.InferType<typeof authDataDetailsSchema>, 'password' | 'password2'>;

export type RequestType = yup.InferType<typeof requestDetailsSchema>;
export type StatusType = yup.InferType<typeof statusDetailsSchema>;
export type AlignmentType = yup.InferType<typeof alignmentDetailsSchema>;
export type ScannerType = yup.InferType<typeof scannerDetailsSchema>;
export type ProductType = yup.InferType<typeof productDetailsSchema>;
export type InsoleType = yup.InferType<typeof insoleDetailsSchema>;

export type PainPointType = any; //yup.InferType<typeof painPointsDetailsSchema>;
export type PathologyData = any; //yup.InferType<typeof pathologyDetailsSchema>;
export type FindingData = any; //yup.InferType<typeof findingDetailsSchema>;
export type IndicationData = any; //yup.InferType<typeof indicationDetailsSchema>;
export type ScanData = any; //yup.InferType<typeof scanDataSchema>;
export type PointData = any; //yup.InferType<typeof xypSchema>;

// export type BiomechanicalProfile = any;
export type PatientDetails = any;
export type PatientProfile = any;
// export type PlantarPressureProfile = any;
export type UserData = any;


// export type RawBiomechanicalProfile = any;
export type RawPatientDetails = any;
export type RawPatientProfile = any;
// export type RawPlantarPressureProfile = any;
export type RawRequestDetails = any;


export type FindingDataAutocomplete = any;
export type Patients = any;
export type IndicationDataAutocomplete = any;
export type Doctors = any;
export type DoctorsAutocomplete = any;
export type PathologyDataAutocomplete = any;
export type Materials = any;
export type Terminations = any;
export type InsoleDetails = any;
export type AlignmentDetails = any;
export type AntropometriaDetails = any;
export type PlantarPressureDetails = any;
export type AnamnesisDetails = any;
export type MedicalOrderDetails = any;
export type RequestModalDetails = any;

export type RawPoints = {
  x: number[],
  y: number[],
};

export type PlantarPressureFootData = {
  bisector: RawPoints,
  centerPressures: RawPoints,
  contours: RawPoints[],
  contoursMap: RawPoints & {
    pressure: number[][],
  },
  foreFootCurve: RawPoints,
  graphics: {
    excursion: RawPoints,
    foreFootCurve: RawPoints,
    foreFootDots: RawPoints,
    hindFootCurve: RawPoints,
    hindFootDots: RawPoints,
  },
  hindFootCurve: RawPoints,
};

export type PlantarPressureProfile = {
  left: PlantarPressureFootData,
  right: PlantarPressureFootData,
};

export type RawPlantarPressureProfile = {
  apiData: PlantarPressureProfile,
};

/* Biomechanical profile */
export type BiomechanicalFoot = {
  longDynamic: string,
  dynamicWidth: string,
  longStatic: string,
  staticWidth: string,
  metatarsus: {
    curve: RawPoints,
    points: RawPoints[],
    segments: RawPoints[],
  },
  prot5: RawPoints,
  cuboide: RawPoints,
  heel: RawPoints,
  bisector: RawPoints,
  length: RawPoints,
  contourMap: RawPoints[],
};

export type BiomechanicalProfile = {
  left: BiomechanicalFoot,
  right: BiomechanicalFoot,
};

export type RawBiomechanicalProfile = {
  apiData: BiomechanicalProfile
};

/* Plantar pressure information */

export type PlantarPressureFrame = {
  centerPression: RawPoints,
  contoursMap: RawPoints & {
    pressure: number[][],
  },
  frameId: string,
  mean: string,
  peak: string,
  peakPressions: RawPoints,
  supportCycle: string,
  supportSurface: string,
  time: string,
};

export type PlantarPressureFramePeak = {
  centerPression: RawPoints,
  contours: RawPoints[],
  contoursMap: RawPoints,
  peakPressions: RawPoints,
};

export type PlantarPressureInformation = {
  left: {
    frame1: PlantarPressureFrame,
    frame2: PlantarPressureFrame,
    frame3: PlantarPressureFrame,
    frame4: PlantarPressureFrame,
    framePeak: PlantarPressureFramePeak
  },
  right: {
    frame1: PlantarPressureFrame,
    frame2: PlantarPressureFrame,
    frame3: PlantarPressureFrame,
    frame4: PlantarPressureFrame,
    framePeak: {
      centerPression: RawPoints,
      contours: RawPoints[],
      contoursMap: RawPoints,
      peakPressions: RawPoints,
    }
  },
};

export type RawPlantarPressureInformation = {
  apiData: PlantarPressureInformation
};
