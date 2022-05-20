import path from 'path'
import { app } from 'electron'
import { Global } from '@/types/type'

const APP_PATH = app.getPath('cache')
const PLUGIN_INSTALL_DIR = path.join(APP_PATH, './plugins')

;(global as unknown as Global).PATH = {
  appPath: APP_PATH,
  pluginInstallDir: PLUGIN_INSTALL_DIR,
}

export { APP_PATH, PLUGIN_INSTALL_DIR }
