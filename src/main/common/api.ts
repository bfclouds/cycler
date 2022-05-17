import { BrowserWindow, ipcMain } from 'electron'
import { AdapterInfo } from '@/types/type'
import runner from '@/main/browser/runner'
import safeParse from '@/common/utils/jsonParse'

interface APIType {
  [key: string]: any
  currentPlugin: AdapterInfo | null
  loadPlugin: (plugin: AdapterInfo, window: BrowserWindow) => void
  openPlugin: (plugin: AdapterInfo, window: BrowserWindow) => void
  unloadPlugin: (params: any, window: BrowserWindow) => void
  setWindowHeight: (params: { height: number }, window: BrowserWindow) => void
}

const runnerInstance = runner()

export const API: APIType = {
  currentPlugin: null,
  setCurrentPlugin(plugin: AdapterInfo) {
    API.currentPlugin = plugin
  },
  loadPlugin(plugin, window) {
    API.setCurrentPlugin(plugin)
    // 卸载之前的plugin
    runnerInstance.removeView(window)
    // 加载plugin
    API.openPlugin(plugin, window)
  },
  openPlugin(plugin, window) {
    window.setSize(window.getSize()[0], 60)
    runnerInstance.createView(plugin, window)
  },
  // 卸载当前加载的插件
  unloadPlugin(params, window) {
    API.currentPlugin = null
    window.setSize(window.getSize()[0], 60)
    runnerInstance.removeView(window)
  },
  setWindowHeight(params, window: BrowserWindow) {
    window.setSize(window.getSize()[0], params.height)
  },
}

export default (mainWindow: BrowserWindow) => {
  ipcMain.handle('msg-trigger', (event, name, params) => {
    let win = mainWindow
    params = safeParse(params)

    if (params && params.winId) {
      win = BrowserWindow.fromId(params.winId) || mainWindow
    }

    if (API[name] && typeof API[name] === 'function') {
      API[name](params, win)
    }
  })
}
