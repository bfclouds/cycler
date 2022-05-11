import PluginHandler from '@/core/plugin-handler'
import { Global } from '@/types/type'
import { PLUGIN_INSTALL_DIR } from '@/common/constans/plugin'

export default () => {
  function init() {
    const pluginManager = new PluginHandler({
      dir: PLUGIN_INSTALL_DIR,
    })

    let pluginInfo = pluginManager.getPluginInfo(
      'feature',
      `${__static}/feature/package.json`
    )
    if (!pluginInfo) {
      return
    }
    pluginInfo = Object.assign(
      {
        indexPath: `${__static}/feature/index.html`,
      },
      pluginInfo
    )
    ;(global as unknown as Global).LOCAL_PLUGIINS.addPlugin(pluginInfo)
  }

  return {
    init,
  }
}
