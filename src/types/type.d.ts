/* eslint-disable */

export type Global = {
  localPlugin: LocalPlugins
}

type PluginType = 'system' | 'app'

export interface MyPlugin {
  cmd: string
  name: string,
  pluginType: PluginType,
  entery: string,
  indexPath: string,
  features?: Features[]
}

export interface Features {
  cmds: string[]
}

type LocalPlugins = {
  [key: string]: any,
  plugins: MyPlugin[],
  getLocalPlugins: () => MyPlugin[],
  addPlugin: (plugin: AdapterInfo) => void
}

export interface CInputEvent extends Event {
  target: HTMLInputElement
}

export interface AdapterInfo {
  // 插件类型
  type: "adapter";
  // 插件名称 rubick-adapter-xxx
  name: string;
  // 可读插件名称
  pluginName: string;
  // 作者
  author: string;
  // 描述
  description: string;
  // 入口文件
  main: string;
  // 版本
  version: string;
  // logo地址
  logo: string;

  features: Features[]
}

export interface RenderPlugin extends AdapterInfo {
  feature: Features, 
  cmd: string,
  pluginType: PluginType,
  action?: string
}