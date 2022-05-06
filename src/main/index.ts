import electron, {
  BrowserWindow,
  app
} from 'electron';
import { main } from './browsers';

class App {
  private windowCreator: { init: () => void; getWindow: () => BrowserWindow };

  constructor() {
    this.windowCreator = main();
    const gotTheLock = app.requestSingleInstanceLock();

    if (!gotTheLock) {
      app.quit();
    } else {
      // this.systemPlugins = registerySystemPlugin();// 读取所有插件
      this.beforeReady();
      this.onReady();
      this.onRunning();
      this.onQuit();
    }
  }

  createWindow() {
    this.windowCreator.init();
  }

  beforeReady() {
    // 系统托盘
    // if (commonConst.macOS()) {
    //   if (commonConst.production() && !app.isInApplicationsFolder()) {
    //     app.moveToApplicationsFolder();
    //   } else {
    //     app.dock.hide();
    //   }
    // } else {
    //   app.disableHardwareAcceleration();
    // }
  }

  onReady() {
    const readyFunction = () => {
      this.createWindow();
      // API(this.windowCreator.getWindow());
      // // this.init()
      // createTray(this.windowCreator.getWindow());
      // registerHotKey(this.windowCreator.getWindow());
      // this.systemPlugins.triggerReadyHooks(
      //   Object.assign(electron, { mainWindow: this.windowCreator.getWindow() })
      // );
    };
    if (!app.isReady()) {
      app.on("ready", readyFunction);
    } else {
      readyFunction();
    }
  }

  onRunning() {
    console.log(1);
  }

  onQuit() {
    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") {
        app.quit();
      }
    });
  }
}

new App()