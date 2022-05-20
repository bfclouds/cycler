const { ipcRenderer } = require('electron')

window.market = {
  downloadPlugin(plugin) {
    return ipcRenderer.invoke(
      'LOCAL_PLUGINS',
      'downloadPlugin',
      JSON.stringify(plugin)
    )
  },
  removePlugin(pluginName) {
    return ipcRenderer.invoke(
      'LOCAL_PLUGINS',
      'removePlugin',
      JSON.stringify({ pluginName })
    )
  },
  getLocalPlugins() {
    return ipcRenderer.invoke(
      'LOCAL_PLUGINS',
      'getLocalPlugins',
    )
  }
}
