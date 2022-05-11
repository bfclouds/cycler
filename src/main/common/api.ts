import { BrowserWindow, ipcMain } from 'electron'
import { AdapterInfo } from '@/types/type'
import runner from '@/main/browser/runner'

interface APIType {
  [key: string]: any
  currentPlugin: AdapterInfo | null
  loadPlugin: (plugin: AdapterInfo, window: BrowserWindow) => void
  openPlugin: (plugin: AdapterInfo, window: BrowserWindow) => void
  unloadPlugin: (params: any, window: BrowserWindow) => void
}

const runnerInstance = runner()

export const API: APIType = {
  currentPlugin: null,
  setCurrentPlugin(plugin: AdapterInfo) {
    API.currentPlugin = plugin
  },
  loadPlugin(plugin, window) {
    API.setCurrentPlugin(plugin)
    // 加载plugin
    API.openPlugin(plugin, window)
  },
  openPlugin(plugin, window) {
    runnerInstance.createView(plugin, window)
  },
  // 卸载当前加载的插件
  unloadPlugin(params, window) {
    API.currentPlugin = null
    runnerInstance.removeView(window)
  },
}

export default (mainWindow: BrowserWindow) => {
  ipcMain.handle('msg-trigger', (event, name, params) => {
    let win = mainWindow
    if (params && params.winId) {
      win = BrowserWindow.fromId(params.winId) || mainWindow
    }

    if (API[name] && typeof API[name] === 'function') {
      API[name](params, win)
    }
  })
}
