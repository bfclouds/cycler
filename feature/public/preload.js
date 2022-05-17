const { ipcRenderer } = require('electron')

window.market = {
  async downloadPlugin(plugin) {
    const res = await ipcRenderer.invoke(
      'LOCAL_PLUGINS',
      'downloadPlugin',
      JSON.stringify(plugin)
    )
    return res
  },
}
