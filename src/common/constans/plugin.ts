import path from 'path'
import { app } from 'electron'

const APP_PATH = app.getPath('cache')
const PLUGIN_INSTALL_DIR = path.join(APP_PATH, './plugins')

export { APP_PATH, PLUGIN_INSTALL_DIR }
