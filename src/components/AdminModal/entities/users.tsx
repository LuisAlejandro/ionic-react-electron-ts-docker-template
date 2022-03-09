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
import { Rifm } from 'rifm';
import { Method } from 'axios';
import lodashGet from 'lodash/get';
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
import makeStyles from '@mui/styles/makeStyles';

import request from 'src/baseplate/request';
import {
  setFormHelperTextStyle,
  setOutlinedSelectTextFieldStyle,
  setFormControlFieldsetStyle,
  setFormControlFieldsetLabelStyle,
} from 'src/shared/common/styles';
import { formatRut, formatPhone, authHeader } from 'src/shared/common/helpers';
import { userDataInitialValues } from 'src/shared/common/values';
import {
  AdminCreateUserType,
  AdminOrganizationType,
  AdminRoleType
} from 'src/pages/Admin/types';
import AvatarImg from 'src/assets/images/png/avatar.png';
import SelectScrollbars from 'src/components/SelectScrollbars';


type SubState = {
  children: ReactNode,
  control: Control<AdminCreateUserType>,
  isCreate: boolean,
  setAlertMessage: (alertMessage: string) => void,
  organizationsList: AdminOrganizationType[],
  rolesList: AdminRoleType[],
};

export const UsersAdminModalContent = (props: SubState) => {

  const {
    children,
    control,
    isCreate,
    setAlertMessage,
    organizationsList,
    rolesList
  } = props;

  const ApiHost = process.env.REACT_APP_API_URL || 'http://api-app.soleitapp.com';

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [ uploadingFiles, setUploadingFiles ] = useState<boolean>(false);
  const [ idNumberLabel, setIdNumberLabel ] = useState<string>('Rut');

  const formHelperTextStyle = makeStyles(setFormHelperTextStyle)();
  const formControlFieldsetLabelStyle = makeStyles(setFormControlFieldsetLabelStyle)();
  const formControlFieldsetStyle = makeStyles(setFormControlFieldsetStyle)();
  const outlinedSelectTextFieldStyle = makeStyles(setOutlinedSelectTextFieldStyle)();

  return (
    <IonGrid class="ion-no-padding ion-margin-vertical">
      <IonRow style={{ height: '350px' }}>
        <IonGrid class="ion-no-padding ion-no-margin">
          <IonRow>
            <IonCol size="7">
              <Controller
                control={control}
                name="avatar"
                render={({
                  field: { onChange, value, ref },
                  fieldState: { error },
                }) => (
                  <>
                    <IonRow>
                      <FormControl component="fieldset"  variant="outlined"
                                   error={Boolean(lodashGet(error, 'message', false))}
                                   classes={{
                                     root: Boolean(lodashGet(error, 'message', false)) ?
                                             formControlFieldsetStyle.rootWithErrors :
                                             formControlFieldsetStyle.root
                                   }}>
                        <FormLabel component="legend" error={Boolean(lodashGet(error, 'message', false))}
                                   classes={{ root: formControlFieldsetLabelStyle.root }}>
                          Avatar
                        </FormLabel>
                        <IonThumbnail slot="start" style={{ width: '100%', height: '170px' }}>
                          <IonImg src={value != '' ? value : AvatarImg} />
                        </IonThumbnail>
                      </FormControl>
                      <FormHelperText error={Boolean(lodashGet(error, 'message', false))}
                                      classes={{ root: formHelperTextStyle.root }}>
                        {lodashGet(error, 'message', '')}
                      </FormHelperText>
                    </IonRow>
                    <IonRow style={{ height: '5px' }}>
                      {uploadingFiles && (
                        <IonGrid class="ion-no-padding ion-no-margin">
                          <IonRow>
                            <IonCol size="24" style={{ lineHeight: '10px' }}>
                              <IonProgressBar
                                type="indeterminate"
                                color="success"
                                class="ion-no-margin"
                                style={{ width: '94%', margin: '0 3%' }}>
                              </IonProgressBar>
                            </IonCol>
                          </IonRow>
                        </IonGrid>
                      )}
                    </IonRow>
                    <IonRow>
                      <input type="file" ref={fileInputRef!}
                             style={{ display: 'none' }}
                             accept="image/png,image/jpeg"
                             onChange={(e: ChangeEvent<HTMLInputElement>) => {
                               if (!(e.target && e.target.files)) return;
                               for (const file of e.target.files) {
                                 if(!file) continue;
                                 setUploadingFiles(true);
                                 let reader = new FileReader();
                                 reader.readAsDataURL(file);
                                 reader.onload = (event: ProgressEvent<FileReader>) => {
                                   if (!event.target) return;
                                   request({
                                     url: `${ApiHost}/files`,
                                     method: 'POST' as Method,
                                     headers: authHeader(),
                                     data: {
                                       email: userDataInitialValues.email,
                                       token: userDataInitialValues.token,
                                       values: {
                                         type: file.type,
                                         filename: file.name,
                                         content: event.target.result,
                                         bucketname: 'avatarusersoleit',
                                       }
                                     }
                                   }).catch((err) => {
                                     setAlertMessage(err);
                                   }).then((response) => {
                                     const r = response as { url: string, filename: string };
                                     if (r) {
                                       onChange(r.url);
                                     }
                                     setUploadingFiles(false);
                                   });
                                 }
                               }
                             }} />
                      <IonButtons class="ion-justify-content-end" style={{ width: '100%' }}>
                        <IonButton class="ion-text-capitalize" fill="solid"
                                  expand="block" color="iprimary"
                                  style={{ width: '94%', marginLeft: '3%', marginRight: '3%' }}
                                  onClick={() => {
                                    fileInputRef && fileInputRef.current && fileInputRef.current.click();
                                  }}>
                          <IonLabel>Subir imagen</IonLabel>
                        </IonButton>
                      </IonButtons>
                    </IonRow>
                  </>
                )}
              />
            </IonCol>
            <IonCol size="17">
              <IonRow>
                <IonCol size="12" class="ion-padding-bottom">
                  <FormControl>
                    <Controller
                      control={control}
                      name="firstName"
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
                          error={Boolean(lodashGet(error, 'message', false))}
                          helperText={lodashGet(error, 'message', '')} />
                      )}
                    />
                  </FormControl>
                </IonCol>
                <IonCol size="12" class="ion-padding-bottom">
                  <FormControl>
                    <Controller
                      control={control}
                      name="lastName"
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
                          label="Apellido"
                          error={Boolean(lodashGet(error, 'message', false))}
                          helperText={lodashGet(error, 'message', '')} />
                      )}
                    />
                  </FormControl>
                </IonCol>
                <IonCol size="12" class="ion-padding-bottom">
                  <Controller
                    control={control}
                    name="idType"
                    render={({
                      field: { onChange, value, ref },
                      fieldState: { error },
                    }) => (
                      <>
                        <FormControl component="fieldset"  variant="outlined"
                                     error={Boolean(lodashGet(error, 'message', false))}
                                     classes={{
                                       root: Boolean(lodashGet(error, 'message', false)) ?
                                               formControlFieldsetStyle.rootWithErrors :
                                               formControlFieldsetStyle.root
                                     }}>
                          <FormLabel component="legend" error={Boolean(lodashGet(error, 'message', false))}
                                    classes={{ root: formControlFieldsetLabelStyle.root }}>
                            Tipo de identificación
                          </FormLabel>
                          <RadioGroup row value={value} onChange={(e: any) => {
                            onChange(e.target.value);
                            setIdNumberLabel((e.target.value == 'rut') ? 'Rut' : 'Pasaporte');
                          }}>
                            <FormControlLabel value="rut" label="Rut" control={<Radio />} />
                            <FormControlLabel value="passport" label="Pasaporte" control={<Radio />} />
                          </RadioGroup>
                        </FormControl>
                        <FormHelperText error={Boolean(lodashGet(error, 'message', false))}
                                        classes={{ root: formHelperTextStyle.root }}>
                          {lodashGet(error, 'message', '')}
                        </FormHelperText>
                      </>
                    )}
                  />
                </IonCol>
                <IonCol size="12" class="ion-padding-bottom">
                  <FormControl>
                    <Controller
                      control={control}
                      name="idNumber"
                      render={({
                        field: { onChange, value, ref },
                        fieldState: { error },
                      }) => (
                        <Rifm format={idNumberLabel == 'Rut' ? formatRut : v => v}
                              value={value} onChange={onChange}>
                          {({ value, onChange }) => (
                            <TextField
                              autoComplete="off"
                              type="text"
                              variant="outlined"
                              label={idNumberLabel}
                              value={value}
                              onChange={onChange}
                              inputRef={ref}
                              error={Boolean(lodashGet(error, 'message', false))}
                              helperText={lodashGet(error, 'message', '')}
                            />
                          )}
                        </Rifm>
                      )}
                    />
                  </FormControl>
                </IonCol>
                <IonCol size="12" class="ion-padding-bottom">
                  <FormControl>
                    <Controller
                      control={control}
                      name="phone"
                      render={({
                        field: { onChange, value, ref },
                        fieldState: { error },
                      }) => (
                        <Rifm format={formatPhone}
                              value={value} onChange={onChange}>
                          {({ value, onChange }) => (
                            <TextField
                              fullWidth
                              autoComplete="off"
                              type="text"
                              variant="outlined"
                              value={value}
                              onChange={onChange}
                              inputRef={ref}
                              label="Teléfono"
                              error={Boolean(lodashGet(error, 'message', false))}
                              helperText={lodashGet(error, 'message', '')}
                            />
                          )}
                        </Rifm>
                      )}
                    />
                  </FormControl>
                </IonCol>
                <IonCol size="12" class="ion-padding-bottom">
                  <FormControl>
                    <Controller
                      control={control}
                      name="email"
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
                          label="Email"
                          error={Boolean(lodashGet(error, 'message', false))}
                          helperText={lodashGet(error, 'message', '')} />
                      )}
                    />
                  </FormControl>
                </IonCol>
                {isCreate && (
                  <>
                    <IonCol size="12" class="ion-padding-bottom">
                      <FormControl>
                        <Controller
                          control={control}
                          name="password"
                          render={({
                            field: { onChange, value, ref },
                            fieldState: { error },
                          }) => (
                            <TextField
                              fullWidth
                              autoComplete="off"
                              type="password"
                              variant="outlined"
                              value={value}
                              onChange={onChange}
                              inputRef={ref}
                              label="Contraseña"
                              error={Boolean(lodashGet(error, 'message', false))}
                              helperText={lodashGet(error, 'message', '')} />
                          )}
                        />
                      </FormControl>
                    </IonCol>
                    <IonCol size="12" class="ion-padding-bottom">
                      <FormControl>
                        <Controller
                          control={control}
                          name="password2"
                          render={({
                            field: { onChange, value, ref },
                            fieldState: { error },
                          }) => (
                            <TextField
                              fullWidth
                              autoComplete="off"
                              type="password"
                              variant="outlined"
                              value={value}
                              onChange={onChange}
                              inputRef={ref}
                              label="Repetir Contraseña"
                              error={Boolean(lodashGet(error, 'message', false))}
                              helperText={lodashGet(error, 'message', '')} />
                          )}
                        />
                      </FormControl>
                    </IonCol>
                  </>
                )}
                <IonCol size="12" class="ion-padding-bottom">
                  <FormControl>
                    <Controller
                      control={control}
                      name="gender"
                      render={({
                        field: { onChange, value, ref },
                        fieldState: { error },
                      }) => (
                        <TextField
                          autoComplete="off"
                          fullWidth
                          select
                          type="text"
                          label="Género"
                          variant="outlined"
                          value={value}
                          onChange={onChange}
                          inputRef={ref}
                          SelectProps={{
                            MenuProps: {
                              classes: {
                                paper: Boolean(lodashGet(error, 'message', false)) ?
                                        outlinedSelectTextFieldStyle.paperWithErrors :
                                        outlinedSelectTextFieldStyle.paper
                              },
                              PaperProps: {
                                square: true,
                                variant: 'outlined',
                                component: SelectScrollbars as any,
                              },
                              TransitionComponent: Collapse,
                              transitionDuration: 100,
                              anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left'
                              },
                              transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left'
                              },
                              elevation: 4,
                              marginThreshold: -50,
                              autoFocus: false,
                              anchorReference: 'anchorEl',
                              getContentAnchorEl: null,
                            }
                          }}
                          error={Boolean(lodashGet(error, 'message', false))}
                          helperText={lodashGet(error, 'message', '')}>
                          <MenuItem value="M">Masculino</MenuItem>
                          <MenuItem value="F">Femenino</MenuItem>
                        </TextField>
                      )}
                    />
                  </FormControl>
                </IonCol>
                <IonCol size="12" class="ion-padding-bottom">
                  <FormControl>
                    <Controller
                      control={control}
                      name="roleId"
                      render={({
                        field: { onChange, value, ref },
                        fieldState: { error },
                      }) => (
                        <TextField
                          select
                          fullWidth
                          autoComplete="off"
                          type="text"
                          label="Role"
                          variant="outlined"
                          value={value}
                          onChange={onChange}
                          inputRef={ref}
                          SelectProps={{
                            MenuProps: {
                              classes: {
                                paper: Boolean(lodashGet(error, 'message', false)) ?
                                          outlinedSelectTextFieldStyle.paperWithErrors :
                                          outlinedSelectTextFieldStyle.paper
                              },
                              PaperProps: {
                                square: true,
                                variant: 'outlined',
                                component: SelectScrollbars as any,
                              },
                              TransitionComponent: Collapse,
                              transitionDuration: 100,
                              anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left'
                              },
                              transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left'
                              },
                              elevation: 4,
                              marginThreshold: -50,
                              autoFocus: false,
                              anchorReference: 'anchorEl',
                              getContentAnchorEl: null,
                            }
                          }}
                          error={Boolean(lodashGet(error, 'message', false))}
                          helperText={lodashGet(error, 'message', '')}>
                        {rolesList.map((role: AdminRoleType, idx: number) => role.name == 'SuperAdmin' || (
                          <MenuItem key={idx} value={role.id}>
                            {role.name}
                          </MenuItem>
                        ))}
                        </TextField>
                      )}
                    />
                  </FormControl>
                </IonCol>
                <IonCol size="12" class="ion-padding-bottom">
                  <FormControl>
                    <Controller
                      control={control}
                      name="organizationId"
                      render={({
                        field: { onChange, value, ref },
                        fieldState: { error },
                      }) => (
                        <TextField
                          select
                          fullWidth
                          disabled={userDataInitialValues.orgName != 'Soleit'}
                          autoComplete="off"
                          type="text"
                          label="Organización"
                          variant="outlined"
                          value={value}
                          onChange={onChange}
                          inputRef={ref}
                          SelectProps={{
                            MenuProps: {
                              classes: {
                                paper: Boolean(lodashGet(error, 'message', false)) ?
                                          outlinedSelectTextFieldStyle.paperWithErrors :
                                          outlinedSelectTextFieldStyle.paper
                              },
                              PaperProps: {
                                square: true,
                                variant: 'outlined',
                                component: SelectScrollbars as any,
                              },
                              TransitionComponent: Collapse,
                              transitionDuration: 100,
                              anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left'
                              },
                              transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left'
                              },
                              elevation: 4,
                              marginThreshold: -50,
                              autoFocus: false,
                              anchorReference: 'anchorEl',
                              getContentAnchorEl: null,
                            }
                          }}
                          error={Boolean(lodashGet(error, 'message', false))}
                          helperText={lodashGet(error, 'message', '')}>
                        {organizationsList.map((organization: AdminOrganizationType, idx: number) => (
                          <MenuItem key={idx} value={organization.id}>
                            {organization.name}
                          </MenuItem>
                        ))}
                        </TextField>
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
