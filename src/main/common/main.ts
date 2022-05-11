import PluginHandler from '@/core/plugin-handler'
import { Global } from '@/types/type'
import { PLUGIN_INSTALL_DIR } from '@/common/constans/plugin'

export default () => {
  function init() {
    const pluginManager = new PluginHandler({
      dir: PLUGIN_INSTALL_DIR
    })

    const pluginInfo = pluginManager.getPluginInfo('feature', `${__static}/feature/package.json`)
    if (!pluginInfo) {
      return
    }
    (global as unknown as Global).LOCAL_PLUGIINS.addPlugin(pluginInfo)
  }

  return {
    init
  }
}