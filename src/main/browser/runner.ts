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
    if (name === 'system-feature') {
      console.log('是system-feature')
      return path.resolve(__static, `../feature/public/preload.js`)
    }
    return getRelativePath(
      path.resolve(getRelativePath(pluginIndexPath), '../', preload)
    )
  }
}

export default () => {
  let renderView: BrowserView | null = null

  async function createView(plugin: AdapterInfo, window: BrowserWindow) {
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
    // ;(await import('@electron/remote/main')).enable(view.webContents)
    window.setBrowserView(view)
    view.webContents.loadFile(pluginIndexPath as string)
    view.webContents.once('dom-ready', () => {
      window.setBounds({ width: 800, height: 760 })
      view.setBounds({ width: 800, height: 700, x: 0, y: 60 })
      view.setAutoResize({
        width: !process.env.NODE_ENV_DEV_ELECTRON,
        height: !process.env.NODE_ENV_DEV_ELECTRON,
      })
      window.webContents.executeJavaScript(
        `window.pluginLoaded(${JSON.stringify(plugin)})`
      )
    })

    // 解决跨域问题
    window.webContents.session.webRequest.onBeforeSendHeaders(
      (details, callback) => {
        callback({ requestHeaders: { Origin: '*', ...details.requestHeaders } })
      }
    )
    view.webContents.session.webRequest.onHeadersReceived(
      (details, callback) => {
        callback({
          responseHeaders: {
            'Access-Control-Allow-Origin': ['*'],
            ...details.responseHeaders,
          },
        })
      }
    )

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
