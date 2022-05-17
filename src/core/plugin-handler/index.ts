import fs from 'fs'
import path from 'path'
import { PluginHandlerType, AdapterInfo } from '@/types/type'
import execSpawn from 'cross-spawn'

class PluginHandler {
  private pluginDir: string
  readonly registry: string

  constructor(options: PluginHandlerType) {
    if (!fs.existsSync(options.dir)) {
      fs.mkdirSync(options.dir)
      fs.writeFileSync(`${options.dir}/package.json`, '{"dependencies":{}}')
    }
    this.pluginDir = options.dir
    this.registry = 'https://registry.npm.taobao.org'
  }
  getPluginInfo(pluginName: string, pluginPath?: string): AdapterInfo | null {
    pluginPath = pluginPath
      ? pluginPath
      : path.resolve(this.pluginDir, 'node_modules', pluginName, 'plugin.json')
    if (fs.existsSync(pluginPath)) {
      const pluginInfo = fs.readFileSync(pluginPath, 'utf-8')
      return JSON.parse(pluginInfo)
    } else {
      return null
    }
  }
  installPlugin(pluginNameArr: string[], options: { isDev: boolean }) {
    const cmd = options.isDev ? 'link' : 'install'
    return this.execCommand(cmd, pluginNameArr)
    // 执行命令安装
  }
  execCommand(cmd: string, modules: string[]) {
    return new Promise((resolve, reject) => {
      let args: string[] = [cmd].concat(modules).concat('--save')
      if (cmd !== 'uninstall') {
        args = args.concat(`--registry=${this.registry}`)
      }

      const npm = execSpawn('npm', args, {
        cwd: this.pluginDir,
      })

      // let output = ''
      // npm.stdout
      //   ?.on('data', (data: string) => {
      //     output += data // 获取输出日志
      //   })
      //   .pipe(process.stdout)

      // npm.stderr
      //   ?.on('data', (data: string) => {
      //     output += data // 获取报错日志
      //   })
      //   .pipe(process.stderr)

      npm.on('close', (code: number) => {
        if (!code) {
          resolve({ code: 0, data: '添加成功' })
        } else {
          reject({ code, data: '添加失败' })
        }
      })
    })
  }
}

export default PluginHandler
