import { BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

export default () => {
  let mainWindow: BrowserWindow

  function init() {
    createWindow()
  }

  async function createWindow() {
    console.log(
      '环境变量》〉》〉',
      process.env.NODE_ENV_DEV_ELECTRON,
      typeof process.env.NODE_ENV_DEV_ELECTRON
    )

    mainWindow = new BrowserWindow({
      width: 800,
      height: 60,
      frame: process.env.NODE_ENV_DEV_ELECTRON === 'false',
      resizable: process.env.NODE_ENV_DEV_ELECTRON === 'false',
      useContentSize: true,
      opacity: 0.98,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    })
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
      if (process.env.NODE_ENV_DEV_ELECTRON === 'false') {
        mainWindow.webContents.openDevTools({
          mode: 'right',
        })
      }
    } else {
      createProtocol('app')
      mainWindow.loadFile(`app://./index.html`)
    }

    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(await import('@electron/remote/main')).enable(mainWindow.webContents)
  }

  function getMainWindow() {
    return mainWindow
  }

  return {
    init,
    getMainWindow,
  }
}
