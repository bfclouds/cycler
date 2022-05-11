import { browserMain } from './browser'
import { main } from './common'
import { app, BrowserView, BrowserWindow } from 'electron'

// 设置global
import '@/common/utils/localPlugins'

class App {
  private windowCreator: { init: () => void, getMainWindow: () => BrowserWindow }
  private mainCreator: { init: () => void }

  constructor() {
    this.windowCreator = browserMain()
    this.mainCreator = main()
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
      // 初始化ui
      this.windowCreator.init()
      // 初始化插件市场
      this.mainCreator.init()

      // 插件加载初始化
      // const mainWIndow = this.windowCreator.getMainWindow()
      // const view = new BrowserView()
      // mainWIndow.setBrowserView(view)

      // view.setBounds({
      //   x: 0,
      //   y: 60,
      //   width: 800,
      //   height: 260
      // })
      // view.setAutoResize({
      //   width: true,
      //   height: true,
      //   horizontal: true,
      //   vertical: true
      // })
      // view.webContents.loadFile(path.join('../public/feature/index.html'))
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