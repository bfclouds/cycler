import { BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

export default () => {
  let mainWIndow: BrowserWindow

  function init() {
    createWindow()
  }

  function createWindow() {
    mainWIndow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      },
    })
    
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      mainWIndow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
      mainWIndow.webContents.openDevTools({
        mode: 'bottom',
      })
    } else {
      createProtocol('app')
      mainWIndow.loadFile(`app://./index.html`)
    }
  }

  function getMainWindow() {
    return mainWIndow
  }

  return {
    init,
    getMainWindow
  }
}