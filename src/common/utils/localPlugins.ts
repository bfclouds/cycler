import { Global } from '@/types/type'
import { ipcMain } from 'electron'
import fs from 'fs'
import path from 'path'
import getLocalDataFile from '@/common/utils/getLocalDataFile'
import PluginHandler from '@/core/plugin-handler'
import { PLUGIN_INSTALL_DIR } from '@/common/constans/plugin'
import commonConst from './commonConst'
import { getLocalPluginPath } from './plugin'
import safeParse from './jsonParse'

const configPath = path.join(getLocalDataFile(), './local-plugins.json')
const myGlobal = global as unknown as Global

let pluginInstance: PluginHandler
;(() => {
  pluginInstance = new PluginHandler({
    dir: PLUGIN_INSTALL_DIR,
  })
})()
;(global as unknown as Global).LOCAL_PLUGIINS = {
  plugins: [],
  getLocalPlugins() {
    try {
      if (myGlobalLocalPlugins.plugins.length <= 0) {
        myGlobalLocalPlugins.plugins = JSON.parse(
          fs.readFileSync(configPath, 'utf-8')
        )
      }
      return myGlobalLocalPlugins.plugins
    } catch (error) {
      myGlobalLocalPlugins.plugins = []
      return myGlobalLocalPlugins.plugins
    }
  },
  async downloadPlugin(plugin) {
    pluginInstance
      .installPlugin([plugin.name], {
        isDev: commonConst.dev(),
      })
      .then((res) => {
        if (plugin.isDev) {
          const pluginPath = getLocalPluginPath(plugin.name)
          const pluginInfo = JSON.parse(
            fs.readFileSync(path.join(pluginPath, './package.json'), 'utf-8')
          )
          plugin = {
            ...plugin,
            ...pluginInfo,
          }
        }
        console.log('addPLugin >>>>> ', plugin)

        myGlobal.LOCAL_PLUGIINS.addPlugin(plugin)
        return myGlobal.LOCAL_PLUGIINS.PLUGINS
      })
  },
  addPlugin(plugin) {
    const plugins = myGlobal.LOCAL_PLUGIINS.getLocalPlugins()
    const pluginIsExist = plugins.some((p) => p.name === plugin.name)
    if (pluginIsExist) {
      return
    }
    console.log('addPLugin222 >>>>> ', typeof plugin)

    if (!pluginIsExist) {
      plugins.unshift(plugin)
      myGlobal.LOCAL_PLUGIINS.plugins = plugins
      console.log('最后的数组>>>>', plugins)

      fs.writeFileSync(configPath, JSON.stringify(plugins))
    }
  },
}

const myGlobalLocalPlugins = myGlobal.LOCAL_PLUGIINS
ipcMain.handle('LOCAL_PLUGINS', (event, name, params) => {
  if (!myGlobalLocalPlugins[name]) {
    return
  }
  if (typeof myGlobalLocalPlugins[name] === 'function') {
    params = safeParse(params)
    return myGlobalLocalPlugins[name](params)
  } else {
    return myGlobalLocalPlugins[name]
  }
})

export default myGlobal
