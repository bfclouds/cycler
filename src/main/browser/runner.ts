import { BrowserWindow, BrowserView } from 'electron'
import { AdapterInfo } from '@/types/type'
import path from 'path'
import { PLUGIN_INSTALL_DIR } from '@/common/constans/plugin'

interface Runner {
  init: () => void
  createView: (plugin: AdapterInfo, window: BrowserWindow) => void
  removeView: (window: BrowserWindow) => void
}

export default (): Runner => {
  let renderView: BrowserView | null = null

  function init() {
    console.log(1)
  }
  function createView(plugin: AdapterInfo, window: BrowserWindow) {
    let pluginIndexPath = plugin.tplPath || plugin.indexPath
    if (!pluginIndexPath) {
      const pluginPath = path.resolve(
        PLUGIN_INSTALL_DIR,
        'node_modules',
        plugin.name
      )
      pluginIndexPath = `file://${path.join(pluginPath, './', plugin.main)}`
    }

    const view = new BrowserView()
    window.setBrowserView(view)
    view.webContents.loadFile(pluginIndexPath as string)
    view.webContents.once('dom-ready', () => {
      window.setBounds({ width: 800, height: 760 })
      view.setBounds({ width: 800, height: 700, x: 0, y: 60 })
      view.setAutoResize({
        width: true,
        height: true,
      })
      window.webContents.executeJavaScript(
        `window.pluginLoaded(${JSON.stringify(plugin)})`
      )
    })
    renderView = view
  }
  function removeView(window: BrowserWindow) {
    if (renderView !== null) {
      window.removeBrowserView(renderView)
      window.webContents.executeJavaScript('window.pluginUnloaded()')
    }
    renderView = null
  }

  return {
    init,
    createView,
    removeView,
  }
}
