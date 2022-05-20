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
    return pluginInstance
      .installPlugin([plugin.name], {
        isDev: commonConst.dev(),
      })
      .then(() => {
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
        myGlobal.LOCAL_PLUGIINS.addPlugin(plugin)
        return myGlobal.LOCAL_PLUGIINS.PLUGINS
      })
  },
  removePlugin({ pluginName }) {
    console.log('unisntall plugin name???>>>>', pluginName)

    return pluginInstance
      .uninstallPlugin([pluginName], {
        isDev: commonConst.dev(),
      })
      .then(() => {
        myGlobal.LOCAL_PLUGIINS.deletePlugin(pluginName)
      })
  },
  addPlugin(plugin) {
    const plugins = myGlobal.LOCAL_PLUGIINS.getLocalPlugins()
    const pluginIsExist = plugins.some((p) => p.name === plugin.name)
    if (pluginIsExist) {
      return
    }
    if (!pluginIsExist) {
      plugins.unshift(plugin)
      myGlobal.LOCAL_PLUGIINS.plugins = plugins
      console.log('最后的数组>>>>', plugins)

      fs.writeFileSync(configPath, JSON.stringify(plugins))
    }
  },
  deletePlugin(pluginName: string) {
    const plugins = myGlobal.LOCAL_PLUGIINS.getLocalPlugins()
    const index = plugins.findIndex((p) => p.name === pluginName)
    console.log(index, JSON.parse(JSON.stringify(plugins)))
    if (index !== -1) {
      plugins.splice(index, 1)
      fs.writeFileSync(configPath, JSON.stringify(plugins))
    }
  },
}

const myGlobalLocalPlugins = myGlobal.LOCAL_PLUGIINS
ipcMain.handle('LOCAL_PLUGINS', (event, name, params) => {
  console.log('local_plugins fn name >>>>', name)

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
