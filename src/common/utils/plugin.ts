import { PLUGIN_INSTALL_DIR as baseDir } from '@/common/constans/plugin'
import path from 'path'

export function getLocalPluginPath(name: string) {
  return path.resolve(baseDir, 'node_modules', name)
}
