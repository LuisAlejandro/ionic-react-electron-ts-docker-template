import { useState, useRef, ChangeEvent, ReactNode } from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonProgressBar,
  IonThumbnail,
  IonImg,
  IonButtons,
  IonButton,
  IonLabel,
} from '@ionic/react';
import _ from 'lodash';
import { Method } from 'axios';
import { Control, Controller } from 'react-hook-form';
import Collapse from '@mui/material/Collapse';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import MenuItem from '@mui/material/MenuItem';

import request from 'src/baseplate/request';
import {
  makeFormHelperTextStyle,
  makeFormControlFieldsetLabelStyle,
  makeFormControlFieldsetStyle,
  makeOutlinedSelectTextFieldStyle,
} from 'src/shared/common/styles';
import { authHeader } from 'src/shared/common/helpers';
import { userDataInitialValues } from 'src/shared/common/values';
import {
  AdminCreateUserType,
  AdminOrganizationType,
  AdminRoleType
} from 'src/pages/Admin/types';
import AvatarImg from 'src/assets/images/png/avatar.png';


type SubState = {
  children: ReactNode,
  control: Control<AdminRoleType>,
  isCreate: boolean,
  setAlertMessage: (alertMessage: string) => void,
  organizationsList: AdminOrganizationType[],
  rolesList: AdminRoleType[],
};

export const RolesAdminModalContent = (props: SubState) => {

  const {
    children,
    control,
    isCreate,
    setAlertMessage,
    organizationsList,
    rolesList
  } = props;

  const ApiHost = process.env.REACT_APP_API_URL;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [ uploadingFiles, setUploadingFiles ] = useState<boolean>(false);
  const [ idNumberLabel, setIdNumberLabel ] = useState<string>('Rut');

  const formHelperTextStyle = makeFormHelperTextStyle();
  const formControlFieldsetLabelStyle = makeFormControlFieldsetLabelStyle();
  const formControlFieldsetStyle = makeFormControlFieldsetStyle();
  const outlinedSelectTextFieldStyle = makeOutlinedSelectTextFieldStyle();

  return (
    <IonGrid class="ion-no-padding ion-margin-vertical">
      <IonRow style={{ height: '350px' }}>
        <IonGrid class="ion-no-padding ion-no-margin">
          <IonRow>
            <IonCol size="24">
              <IonRow>
                <IonCol size="24" class="ion-padding-bottom">
                  <FormControl>
                    <Controller
                      control={control}
                      name="name"
                      render={({
                        field: { onChange, value, ref },
                        fieldState: { error },
                      }) => (
                        <TextField
                          fullWidth
                          autoComplete="off"
                          type="text"
                          variant="outlined"
                          value={value}
                          onChange={onChange}
                          inputRef={ref}
                          label="Nombre"
                          error={Boolean(_.get(error, 'message', false))}
                          helperText={_.get(error, 'message', '')} />
                      )}
                    />
                  </FormControl>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonRow>
      <IonRow>
        {children}
      </IonRow>
    </IonGrid>
  );
};
