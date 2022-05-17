import { BrowserWindow, BrowserView, session } from 'electron'
import { AdapterInfo } from '@/types/type'
import path from 'path'
import { PLUGIN_INSTALL_DIR } from '@/common/constans/plugin'
import commonConst from '@/common/utils/commonConst'
// interface Runner {
//   init: () => void
//   createView: (plugin: AdapterInfo, window: BrowserWindow) => void
//   removeView: (window: BrowserWindow, callBack: () => void) => void
// }

const getRelativePath = (indexPath: string) => {
  return commonConst.windows()
    ? indexPath.replace('file://', '')
    : indexPath.replace('file:', '')
}

const getPreloadPath = (plugin: AdapterInfo, pluginIndexPath: string) => {
  const { name, preload, tplPath, indexPath } = plugin
  if (!preload) return
  if (commonConst.dev()) {
    if (name === 'rubick-system-feature') {
      console.log('是rubick-system-feature')
      return path.resolve(__static, `../feature/public/preload.js`)
    }
    return getRelativePath(
      path.resolve(getRelativePath(pluginIndexPath), '../', preload)
    )
  }
}

export default () => {
  let renderView: BrowserView | null = null

  function createView(plugin: AdapterInfo, window: BrowserWindow) {
    if (renderView !== null) {
      return
    }
    let pluginIndexPath = plugin.tplPath || plugin.indexPath
    if (!pluginIndexPath) {
      const pluginPath = path.resolve(
        PLUGIN_INSTALL_DIR,
        'node_modules',
        plugin.name
      )
      pluginIndexPath = `${path.join(pluginPath, './', plugin.main)}`
    }
    const preload = getPreloadPath(plugin, pluginIndexPath)
    const ses = session.fromPartition('<' + plugin.name + '>')
    ses.setPreloads([`${__static}/preload.js`])

    const view = new BrowserView({
      webPreferences: {
        contextIsolation: false,
        preload,
        session: ses,
      },
    })
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
  function removeView(window: BrowserWindow, callBack?: () => void) {
    if (renderView !== null) {
      window.removeBrowserView(renderView)
      window.webContents.executeJavaScript('window.pluginUnloaded()')
      callBack && callBack()
    }
    renderView = null
  }

  return {
    createView,
    removeView,
  }
}
