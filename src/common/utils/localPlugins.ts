import { Global } from '@/types/type'
import { ipcMain } from 'electron'
import fs from 'fs'
import path from 'path'
import getLocalDataFile from '@/common/utils/getLocalDataFile'

const configPath = path.join(getLocalDataFile(), "./local-plugins.json")
const myGlobal = (global as unknown as Global)
const myGlobalLocalPlugins = myGlobal.LOCAL_PLUGIINS

;(global as unknown as Global).LOCAL_PLUGIINS = {
  plugins: [],
  getLocalPlugins() {
    try {
      if (myGlobalLocalPlugins.plugins.length <= 0) {
        myGlobalLocalPlugins.plugins = JSON.parse(
          fs.readFileSync(configPath, "utf-8")
        );
      }
      return myGlobalLocalPlugins.plugins
    } catch (error) {
      console.log(error);
      
      myGlobalLocalPlugins.plugins = []
      return myGlobalLocalPlugins.plugins
    }
  },
  addPlugin(plugin) {
    console.log('这是我的Plugin', plugin);
    const plugins = myGlobalLocalPlugins.getLocalPlugins()
    console.log('plugins: >>>>', plugins);

    const pluginIsExist = plugins.some(p => p.name === plugin.name)
    if (pluginIsExist) {
      return
    }

    if (!pluginIsExist) {
      plugins.unshift(plugin)
      myGlobalLocalPlugins.plugins = plugins
      fs.writeFileSync(configPath, JSON.stringify(plugins))
    }
  }
}


ipcMain.handle('LOCAL_PLUGINS', (event, name, params) => {
  console.log(myGlobalLocalPlugins);
  
  if (!myGlobalLocalPlugins[name]) {
    return
  }
  if (typeof myGlobalLocalPlugins[name] === 'function') {
    return myGlobalLocalPlugins[name](params)
  } else {
    return myGlobalLocalPlugins[name]
  }
})

export default myGlobal