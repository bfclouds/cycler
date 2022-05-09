import { BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

export default () => {
  let win: BrowserWindow

  function init() {
    createWindow()
  }

  function createWindow() {
    win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      },
    })
    
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
      win.webContents.openDevTools({
        mode: 'bottom',
      })
    } else {
      createProtocol('app')
      win.loadFile(`app://./index.html`)
    }
  }

  function getMainWindow() {
    return win
  }

  return {
    init,
    getMainWindow
  }
}