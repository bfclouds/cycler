const { ipcRenderer } = require('electron')

window.market = {
  downloadPlugin(plugin) {
    return ipcRenderer.invoke(
      'LOCAL_PLUGINS',
      'downloadPlugin',
      JSON.stringify(plugin)
    )
  },
  getLocalPlugins() {
    return ipcRenderer.invoke(
      'LOCAL_PLUGINS',
      'getLocalPlugins',
    )
  }
}
