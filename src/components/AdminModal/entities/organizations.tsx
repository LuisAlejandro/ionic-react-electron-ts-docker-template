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
import { Method } from 'axios';
import lodashGet from 'lodash/get';
import { Control, Controller } from 'react-hook-form';
import Collapse from '@mui/material/Collapse';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import {
  makeFormHelperTextStyle,
  makeFormControlFieldsetLabelStyle,
  makeFormControlFieldsetStyle,
  makeOutlinedSelectTextFieldStyle,
} from 'src/shared/common/styles';
import request from 'src/baseplate/request';
import { authHeader } from 'src/shared/common/helpers';
import { userDataInitialValues } from 'src/shared/common/values';
import { AdminOrganizationType } from 'src/pages/Admin/types';
import OrgLogo from 'src/assets/images/png/orglogo.png';
import SelectScrollbars from 'src/components/SelectScrollbars';


type SubState = {
  children: ReactNode,
  control: Control<AdminOrganizationType>,
  setAlertMessage: (x: string) => void,
};

export const OrganizationsAdminModalContent = (props: SubState) => {

  const { children, control, setAlertMessage } = props;

  const ApiHost = process.env.REACT_APP_API_URL;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [ uploadingFiles, setUploadingFiles ] = useState<boolean>(false);

  const formHelperTextStyle = makeFormHelperTextStyle();
  const formControlFieldsetLabelStyle = makeFormControlFieldsetLabelStyle();
  const formControlFieldsetStyle = makeFormControlFieldsetStyle();
  const outlinedSelectTextFieldStyle = makeOutlinedSelectTextFieldStyle();

  return (
    <IonGrid class="ion-no-padding ion-margin-vertical">
      <IonRow style={{ height: '350px' }}>
        <IonGrid class="ion-no-padding ion-no-margin">
          <IonRow>
            <IonCol size="7">
              <Controller
                control={control}
                name="logo"
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
                                             formControlFieldsetStyle.classes.rootWithErrors :
                                             formControlFieldsetStyle.classes.root
                                   }}>
                        <FormLabel component="legend" error={Boolean(lodashGet(error, 'message', false))}
                                   classes={{ root: formControlFieldsetLabelStyle.classes.root }}>
                          Logo
                        </FormLabel>
                        <IonThumbnail slot="start" style={{ width: '100%', height: '170px' }}>
                          <IonImg src={value != '' ? value : OrgLogo} />
                        </IonThumbnail>
                      </FormControl>
                      <FormHelperText error={Boolean(lodashGet(error, 'message', false))}
                                      classes={{ root: formHelperTextStyle.classes.root }}>
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
                                         bucketname: 'orgslogos',
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
            <IonCol size="17" class="ion-padding-bottom">
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
                          label="Organización"
                          error={Boolean(lodashGet(error, 'message', false))}
                          helperText={lodashGet(error, 'message', '')} />
                      )}
                    />
                  </FormControl>
                </IonCol>
              </IonRow>
              <IonRow>
                <FormControl>
                  <Controller
                    control={control}
                    name="type"
                    render={({
                      field: { onChange, value, ref },
                      fieldState: { error },
                    }) => (
                      <TextField
                        fullWidth
                        select
                        autoComplete="off"
                        type="text"
                        label="Tipo"
                        variant="outlined"
                        value={value}
                        onChange={onChange}
                        inputRef={ref}
                        SelectProps={{
                          MenuProps: {
                            classes: {
                              paper: Boolean(lodashGet(error, 'message', false)) ?
                                      outlinedSelectTextFieldStyle.classes.paperWithErrors :
                                      outlinedSelectTextFieldStyle.classes.paper
                            },
                            PaperProps: {
                              square: true,
                              variant: 'outlined',
                              // component: SelectScrollbars as any,
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
                            // getContentAnchorEl: null,
                          }
                        }}
                        error={Boolean(lodashGet(error, 'message', false))}
                        helperText={lodashGet(error, 'message', '')}>
                        <MenuItem value="adquisición">Adquisición</MenuItem>
                        <MenuItem value="fabricación">Fabricación</MenuItem>
                      </TextField>
                    )}
                  />
                </FormControl>
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
