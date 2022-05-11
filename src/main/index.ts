import { browserMain } from './browser'
import { main } from './common'
import { app, BrowserWindow } from 'electron'
import API from './common/api'

// 设置global
import '@/common/utils/localPlugins'

class App {
  private windowCreator: {
    init: () => void
    getMainWindow: () => BrowserWindow
  }
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
    console.log('beforeReady >>>>>')
  }

  onReady() {
    console.log('onReady >>>>>')
    const onReadyFn = () => {
      // 初始化ui
      this.windowCreator.init()
      // 初始化插件加载功能
      API(this.windowCreator.getMainWindow())
      // 初始化插件市场
      this.mainCreator.init()
    }

    if (!app.isReady()) {
      app.on('ready', onReadyFn)
    } else {
      onReadyFn
    }
  }

  onQuit() {
    console.log('onQuit >>>>>')
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })
  }
}

new App()
