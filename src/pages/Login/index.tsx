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
  IonRouterLink
} from '@ionic/react';
import { connect } from 'react-redux';
import { compose, Dispatch, Action } from 'redux';
import { createStructuredSelector } from 'reselect';
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

import injector from 'src/baseplate/injector';
import { EProps } from 'src/shared/common/types';
import { validateEmail } from 'src/shared/common/helpers';
import { createLoginMuiTheme } from 'src/shared/common/themes';
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



declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}



const Login: React.FC<InferMappedProps> = ({ eProps, ...props }: InferMappedProps) => {

  const { handleLogin, setAlertMessage } = eProps;
  const { userLoggingIn, alertMessage } = props;

  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [ validEmail, setValidEmail ] = useState<boolean>(false);
  const [ validPassword, setValidPassword ] = useState<boolean>(false);
  const [ emailErrorMessage, setEmailErrorMessage ] = useState<string>(' ');
  const [ passwordErrorMessage, setPasswordErrorMessage ] = useState<string>(' ');
  const [ showToast, setShowToast ] = useState<boolean>(false);

  useEffect(() => {
    if (!alertMessage) return;
    setShowToast(true);
  }, [alertMessage]);

  const handleEmailChange = (email: string) => {
    setEmail(email);
    if (!email) {
      setEmailErrorMessage('Por favor introduce tu correo electrónico');
      setValidEmail(false);
      return;
    }
    if (validateEmail(email) === false) {
      setEmailErrorMessage('Correo electrónico inválido');
      setValidEmail(false);
      return;
    }
    setEmailErrorMessage(' ');
    setValidEmail(true);
  }

  const handlePasswordChange = (password: string) => {
    setPassword(password);
    if (!password) {
      setPasswordErrorMessage('Por favor introduce tu contraseña');
      setValidPassword(false);
      return;
    }
    if (password.length < 6) {
      setPasswordErrorMessage('La contraseña debe tener 6 caracteres o más');
      setValidPassword(false);
      return;
    }
    setPasswordErrorMessage(' ');
    setValidPassword(true);
  }

  return <>
    <IonPage className={style['login-page']}>
      <IonContent className={style['login-content']}>
        <IonGrid className={style['login-grid']}>
          <IonRow>
            <IonCol size="8"></IonCol>
            <IonCol size="8">
              <IonCard className={style['login-card']}>
                <IonCardContent>
                  <IonGrid>
                    <IonRow class="ion-justify-content-center ion-padding-bottom">
                      <img src={logo} className="ion-padding-vertical" />
                    </IonRow>
                    <IonRow class="ion-justify-content-center ion-padding-vertical">
                      <IonTitle color={userLoggingIn ? 'gray30' : 'black'} class="ion-text-center">
                        Iniciar Sesión
                      </IonTitle>
                    </IonRow>
                    <StyledEngineProvider injectFirst>
                      <ThemeProvider theme={createLoginMuiTheme}>
                        <IonRow class="ion-justify-content-center ion-padding-top">
                          <TextField
                            label="Correo Electrónico"
                            variant="outlined"
                            type="email"
                            name="email"
                            value={email}
                            autoComplete="off"
                            disabled={userLoggingIn}
                            error={email !== '' && !validEmail}
                            helperText={emailErrorMessage}
                            onChange={(e) => handleEmailChange(e.target.value)} />
                        </IonRow>
                        <IonRow class="ion-justify-content-center ion-padding-top">
                          <TextField
                            label="Contraseña"
                            variant="outlined"
                            type="password"
                            name="password"
                            value={password}
                            autoComplete="off"
                            disabled={userLoggingIn}
                            error={password !== '' && !validPassword}
                            helperText={passwordErrorMessage}
                            onChange={(e) => handlePasswordChange(e.target.value)} />
                        </IonRow>
                      </ThemeProvider>
                    </StyledEngineProvider>
                    <IonRow class="ion-justify-content-center ion-padding-vertical">
                      <IonRouterLink href="/passwordreset">¿Olvidaste tu contraseña?</IonRouterLink>
                    </IonRow>
                    <IonRow class="ion-justify-content-center">
                      <IonButton
                        color="primary"
                        class="ion-text-capitalize"
                        disabled={!(validEmail && validPassword)}
                        onClick={() => handleLogin(email, password)}>
                          Ingresar
                      </IonButton>
                    </IonRow>
                    <IonRow class="ion-justify-content-center" style={{ height: '50px' }}>
                      {userLoggingIn &&
                        <IonProgressBar
                          type="indeterminate"
                          color="success"
                          class="ion-margin-vertical"
                          style={{ width: '60%' }}>
                        </IonProgressBar>
                      }
                    </IonRow>
                  </IonGrid>
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
