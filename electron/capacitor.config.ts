/// <reference types="@capacitor/local-notifications" />
/// <reference types="@capacitor/push-notifications" />
/// <reference types="@capacitor/splash-screen" />

import { CapacitorConfig } from '@capacitor/cli';
import { CapacitorElectronConfig } from '@capacitor-community/electron';


const config: CapacitorConfig & { electron: CapacitorElectronConfig } = {
  appId: 'app.ionic-app.ionic-app',
  appName: 'ionic-app',
  webDir: 'build',
  bundledWebRuntime: false,
  electron: {
    // Custom scheme for your app to be served on in the electron window.
    customUrlScheme: 'capacitor-electron',
    // Switch on/off a tray icon and menu, which is customizable in the app.
    trayIconAndMenuEnabled: false,
    // Switch on/off whether or not a splashscreen will be used.
    splashScreenEnabled: true,
    // Custom image name in the electron/assets folder to use as splash image (.gif included)
    splashScreenImageName: 'splash.png',
    // Switch on/off if the main window should be hidden until brought to the front by the tray menu, etc.
    hideMainWindowOnLaunch: false,
    // Switch on/off whether or not to use deeplinking in your app.
    deepLinkingEnabled: true,
    // Custom protocol to be used with deeplinking for your app.
    deepLinkingCustomProtocol: 'ionic-app',
  }
};

export default config;
