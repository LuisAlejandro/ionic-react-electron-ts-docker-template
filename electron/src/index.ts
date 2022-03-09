import { join } from 'path';
import { spawn, exec } from 'child_process';
import {
  app,
  BrowserWindow,
  Menu,
  MenuItem,
  nativeImage,
  Tray,
} from 'electron';
import electronIsDev from 'electron-is-dev';
import electronServe from 'electron-serve';
import {
  CapElectronEventEmitter,
  CapacitorSplashScreen,
  getCapacitorConfig,
  setupCapacitorElectronPlugins,
  setupElectronDeepLinking
} from '@capacitor-community/electron';

// Get Config options from capacitor.config file
const CapacitorFileConfig = getCapacitorConfig();

const TrayMenuTemplate = [
  new MenuItem({ label: 'Quit App', role: 'quit' })
];

const AppMenuBarMenuTemplate = [
  { role: process.platform === 'darwin' ? 'appMenu' : 'fileMenu' },
  { role: 'viewMenu' },
];

const DeepLinkingConfig = {
  customProtocol: CapacitorFileConfig.deepLinkingCustomProtocol ?? 'mycapacitorapp',
};

class SoleitApp {
  private MainWindow: BrowserWindow | null = null;
  private SplashScreen: CapacitorSplashScreen | null = null;
  private TrayIcon: Tray | null = null;
  private loadWebApp;

  constructor() {
    this.loadWebApp = electronServe({
      directory: join(app.getAppPath(), 'app'),
      // The scheme can be changed to whatever you'd like (ex: someapp)
      scheme: CapacitorFileConfig.customUrlScheme ?? 'capacitor-electron',
    });
  }

  private async loadMainWindow(thisRef: any) {
    await thisRef.loadWebApp(thisRef.MainWindow);
  }

  getMainWindow() {
    return this.MainWindow;
  }

  async init() {
    this.MainWindow = new BrowserWindow({
      show: false,
      width: 1200,
      height: 750,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        // Use preload to inject the electron varriant overrides for capacitor plugins.
        // Note: any windows you spawn that you want to include capacitor plugins must have this preload.
        preload: join(app.getAppPath(), 'node_modules', '@capacitor-community', 'electron', 'dist', 'runtime', 'electron-rt.js'),
      },
    });

    this.MainWindow.on('closed', () => {
      if (this.SplashScreen &&
          this.SplashScreen.getSplashWindow() &&
          !this.SplashScreen.getSplashWindow().isDestroyed()) {
        this.SplashScreen.getSplashWindow().close();
      }
    });

    if (CapacitorFileConfig.trayIconAndMenuEnabled) {
      this.TrayIcon = new Tray(nativeImage.createFromPath(join(app.getAppPath(), 'assets', process.platform === 'win32' ? 'icon.ico' : 'icon.png')));
      this.TrayIcon.on('double-click', () => {
        if (this.MainWindow) {
          if (this.MainWindow.isVisible()) {
            this.MainWindow.hide();
          } else {
            this.MainWindow.show();
            this.MainWindow.focus();
          }
        }
      });

      this.TrayIcon.on('click', () => {
        if (this.MainWindow) {
          if (this.MainWindow.isVisible()) {
            this.MainWindow.hide();
          } else {
            this.MainWindow.show();
            this.MainWindow.focus();
          }
        }
      });

      this.TrayIcon.setToolTip(app.getName());
      this.TrayIcon.setContextMenu(
        Menu.buildFromTemplate(TrayMenuTemplate)
      );
    }

    // Setup app windows menu bar
    Menu.setApplicationMenu(
      // @ts-ignore
      Menu.buildFromTemplate(AppMenuBarMenuTemplate)
    );

    if (CapacitorFileConfig.splashScreenEnabled) {
      this.SplashScreen = new CapacitorSplashScreen({
        imageFilePath: join(app.getAppPath(), 'assets', CapacitorFileConfig.splashScreenImageName ?? 'splash.png'),
        windowWidth: 400,
        windowHeight: 400,
      });
      this.SplashScreen.init(this.loadMainWindow, this);
    } else {
      this.loadMainWindow(this);
    }

    // Link electron plugins in
    setupCapacitorElectronPlugins()

    this.MainWindow.webContents.on('dom-ready', () => {
      if (CapacitorFileConfig.splashScreenEnabled) {
        this.SplashScreen.getSplashWindow().hide();
      }
      if (!CapacitorFileConfig.hideMainWindowOnLaunch) {
        this.MainWindow.show();
      }
      setTimeout(() => {
        if (electronIsDev) {
          this.MainWindow.webContents.openDevTools();
        }
        CapElectronEventEmitter.emit('CAPELECTRON_DeeplinkListenerInitialized', '');
      }, 400);
    });
  }
}

const soleitApp = new SoleitApp();

if (CapacitorFileConfig.deepLinkingEnabled) {
  setupElectronDeepLinking(soleitApp, DeepLinkingConfig);
}

// Run Application
(async () => {

  await app.whenReady();
  await soleitApp.init();

  app.on('window-all-closed', function () {
    app.quit();
  });

  app.on('activate', async function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (soleitApp.getMainWindow().isDestroyed()) { 
      await soleitApp.init();
    }
  });

})();
