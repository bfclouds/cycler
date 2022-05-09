import { main } from './browser'
import { app } from 'electron'

class App {
  private windowCreator: { init: () => void, getMainWindow: () => void }
  constructor() {
    this.windowCreator = main();
    const lock = app.requestSingleInstanceLock()
    if (!lock) {
      app.quit()
    } else {
      this.beforeReady()
      this.onReady()
      this.onQuit()
    }
  }

  beforeReady() {
    console.log('beforeReady >>>>>');
  }

  onReady() {
    console.log('onReady >>>>>');
    

    const onReadyFn = () => {
      console.log('开始初始化');
      
      this.windowCreator.init()
    }

    if (!app.isReady()) {
      app.on('ready', onReadyFn)
    } else {
      onReadyFn
    }
  }

  onQuit() {
    console.log('onQuit >>>>>');
    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") {
        app.quit();
      }
    });
  }
}

new App()