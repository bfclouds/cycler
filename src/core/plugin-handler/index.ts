import fs from 'fs'
import path from 'path'
import { PluginHandlerType, AdapterInfo } from '@/types/type'

class PluginHandler {
  private pluginDir: string
  constructor(options: PluginHandlerType) {
    if (!fs.existsSync(options.dir)) {
      fs.mkdirSync(options.dir)
      fs.writeFileSync(
        `${options.dir}/package.json`,
        '{"dependencies":{}}'
      )
    }
    this.pluginDir = options.dir
  }
  getPluginInfo(pluginName: string, pluginPath?: string): AdapterInfo|null {
    pluginPath = pluginPath ? pluginPath : path.resolve(this.pluginDir, "node_modules", pluginName, "plugin.json")
    if (fs.existsSync(pluginPath)) {
      const pluginInfo = fs.readFileSync(pluginPath, 'utf-8')
      return JSON.parse(pluginInfo)
    } else {
      return null
    }
  }
}

export default PluginHandler