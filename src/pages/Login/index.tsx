import React, { memo, useEffect, useState } from 'react';
import {
  IonCard,
  IonCardContent,
  IonContent,
  IonPage,
  IonTitle,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonProgressBar,
  IonToast,
} from '@ionic/react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { compose, Dispatch, Action } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Controller, FieldErrors, UnpackNestedValue, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { yupResolver } from '@hookform/resolvers/yup';
import { ThemeProvider } from '@mui/material/styles';

import injector from 'src/baseplate/injector';
import { EProps, LoginFormType } from 'src/shared/common/types';
import { loginFormSchema } from 'src/shared/common/schemas';
import { loginFormInitialValues } from 'src/shared/common/values';
import { flattenObject } from 'src/shared/common/helpers';
import { loginFormTheme } from 'src/shared/common/themes';
import logo from 'src/assets/images/svg/logo.svg';

import {
  makeSelectorAlertMessage,
  makeSelectorUserLoggingIn,
  makeSelectorUserLoggedIn
} from './selectors';
import { userActions, alertActions } from './actions'
import { NameSpace } from './constants';
import reducer from './reducer';
import saga from './saga';
import { InferMappedProps, SubState } from './types';
import style from './style.module.scss';


const Login: React.FC<InferMappedProps> = ({ eProps, ...props }: InferMappedProps) => {

  const { handleLogin, setAlertMessage } = eProps;
  const { userLoggingIn, alertMessage } = props;

  const [ showToast, setShowToast ] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
  } = useForm<LoginFormType>({
    defaultValues: loginFormInitialValues,
    resolver: yupResolver(loginFormSchema),
  });

  const onValidSubmit = (values: UnpackNestedValue<LoginFormType>, event?: React.BaseSyntheticEvent) => {
    handleLogin(values.email, values.password);
  };

  const onInvalidSubmit = (errors: FieldErrors<LoginFormType>, event?: React.BaseSyntheticEvent) => {
    const flattenedErrors = flattenObject(errors);
    const firstError = Object.keys(flattenedErrors).filter((e) => e.endsWith('.message'))[0];
    setAlertMessage(`Error: ${flattenedErrors[firstError]}`);
  };

  useEffect(() => {
    if (!alertMessage) return;
    setShowToast(true);
  }, [alertMessage]);


  return <>
    <IonPage className={style['login-page']}>
      <IonContent className={style['login-content']}>
        <IonGrid className={style['login-grid']}>
          <IonRow>
            <IonCol size="8"></IonCol>
            <IonCol size="8">
              <IonCard className={style['login-card']}>
                <IonCardContent>
                  <ThemeProvider theme={loginFormTheme}>
                    <form onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}>
                      <IonGrid>
                        <IonRow class="ion-justify-content-center ion-padding-bottom">
                          <img src={logo} className="ion-padding-vertical" />
                        </IonRow>
                        <IonRow class="ion-justify-content-center ion-padding-vertical">
                          <IonTitle color={userLoggingIn ? 'gray30' : 'black'} class="ion-text-center">
                            Iniciar Sesión
                          </IonTitle>
                        </IonRow>
                        <IonRow class="ion-justify-content-center ion-padding-top">
                          <Controller
                            control={control}
                            name="email"
                            render={({
                              field: { onChange, value, ref },
                              fieldState: { error },
                            }) => (
                              <TextField
                                autoComplete="off"
                                type="email"
                                variant="outlined"
                                margin="dense"
                                label="Email"
                                disabled={userLoggingIn}
                                value={value}
                                onChange={onChange}
                                inputRef={ref}
                                error={Boolean(_.get(error, 'message', false))}
                                helperText={_.get(error, 'message', '')}
                              />
                            )}
                          />
                        </IonRow>
                        <IonRow class="ion-justify-content-center ion-padding-top">
                          <Controller
                            control={control}
                            name="password"
                            render={({
                              field: { onChange, value, ref },
                              fieldState: { error },
                            }) => (
                              <TextField
                                autoComplete="off"
                                type="password"
                                variant="outlined"
                                margin="dense"
                                label="Password"
                                disabled={userLoggingIn}
                                value={value}
                                onChange={onChange}
                                inputRef={ref}
                                error={Boolean(_.get(error, 'message', false))}
                                helperText={_.get(error, 'message', '')}
                              />
                            )}
                          />
                        </IonRow>
                        <IonRow class="ion-justify-content-center">
                          <IonButton
                            color="primary"
                            class="ion-text-capitalize"
                            type="submit">
                            Ingresar
                          </IonButton>
                        </IonRow>
                        <IonRow class="ion-justify-content-center" style={{ height: '50px' }}>
                          {userLoggingIn && (
                            <IonProgressBar
                              type="indeterminate"
                              color="success"
                              class="ion-margin-vertical"
                              style={{ width: '60%' }}>
                            </IonProgressBar>
                          )}
                        </IonRow>
                      </IonGrid>
                    </form>
                  </ThemeProvider>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="8"></IonCol>
          </IonRow>
        </IonGrid>
        <IonToast
          onDidDismiss={() => {
            setShowToast(false);
            setAlertMessage('');
          }}
          isOpen={showToast && alertMessage != ''}
          message={alertMessage}
          position="top"
          duration={10000}
          translucent={true}
          buttons={[{
            text: 'Cerrar',
            role: 'cancel',
          }]} />
      </IonContent>
    </IonPage>
  </>;
};

/** @returns {object} Contains state props from selectors */
export const mapStateToProps = createStructuredSelector<SubState, SubState>({
  alertMessage: makeSelectorAlertMessage(),
  userLoggingIn: makeSelectorUserLoggingIn(),
  userLoggedIn: makeSelectorUserLoggedIn(),
});

/** @returns {object} Contains dispatchable props */
export const mapDispatchToProps = (dispatch: Dispatch<Action>): EProps => {
  return {
    // eProps - Emitter proptypes thats binds to dispatch
    eProps: {
      setAlertMessage: (alertMessage: string) =>
        dispatch(alertActions.setAlert({ alertMessage })),
      handleLogin: (email: string, password: string) =>
        dispatch(userActions.userLoginFormSubmit({ email, password }))
    }
  };
}

/**
 * Injects prop and saga bindings done via
 * useInjectReducer & useInjectSaga
 */
const withInjectedMode = injector(
  Login,
  {
    key: NameSpace,
    reducer,
    saga
  }
);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(withInjectedMode) as React.ComponentType<InferMappedProps>;
