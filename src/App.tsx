import React, { useEffect } from 'react';
import {
  IonApp,
  IonRouterOutlet,
} from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import { IpcRenderer } from 'electron';
import WebFont from 'webfontloader';

import Home from './pages/Home/Loadable';
import Login from './pages/Login/Loadable';
import Profile from './pages/Profile/Loadable';
import Admin from './pages/Admin/Loadable';

import history from './baseplate/history';
import PrivateRoute from './PrivateRoute';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import 'overlayscrollbars/css/OverlayScrollbars.css';


const SoleitApp: React.FC = () => {

  useEffect(() => {
    if (!Boolean(process.env.REACT_APP_API_URL)) {
      const ipcRenderer: IpcRenderer = window.require('electron').ipcRenderer;
      ipcRenderer.on('appUrlOpen', (event: any, args: any) => {
        const slug = args.replace('soleit://', '');
        if (slug) {
          location.href = slug;
        }
      });
    }
    WebFont.load({
      google: {
        families: ['Poppins:300,400,500,600,700']
      }
    });
   }, []);

  return (
    <IonApp>
      <IonReactRouter history={history}>
        <IonRouterOutlet>
          <PrivateRoute path="/users/profile/:id?" component={Profile} />
          <PrivateRoute exact path="/admin/:type" component={Admin} />
          <PrivateRoute exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" render={() => (<Redirect to="/home" />)} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default SoleitApp;
