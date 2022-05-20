import search from './search'
import { AdapterInfo } from '@/types/type'
import { ipcRenderer } from 'electron'
import { reactive, toRefs } from 'vue'
import PluginHandler from '@/core/plugin-handler'
import { app } from '@electron/remote'
import path from 'path'

interface Sate {
  currentPlugin: AdapterInfo | null
  pluginLoading: boolean
}

const renderPluginManager = () => {
  const pluginInstance = new PluginHandler({
    dir: path.join(app.getPath('cache'), './plugins'),
  })

  const state = reactive<Sate>({
    currentPlugin: null,
    pluginLoading: false,
  })
  function setCurrentPlugin(plugin: AdapterInfo | null) {
    state.currentPlugin = plugin
  }

  const { searchValue, setSearchValue, onSearch, searchOptions } = search({
    currentPlugin: toRefs(state).currentPlugin,
  })

  async function selectPlugin(plugin: AdapterInfo) {
    loadPlugin(plugin)
    await ipcRenderer.invoke('msg-trigger', 'loadPlugin', plugin.name)
  }
  async function unloadPlugin() {
    await ipcRenderer.invoke('msg-trigger', 'unloadPlugin')
  }
  function loadPlugin(plugin: AdapterInfo) {
    state.pluginLoading = true
    setCurrentPlugin(plugin)
    setSearchValue('')
  }
  function getPluginInfo(pluginName: string, path: string) {
    return pluginInstance.getPluginInfo(pluginName, path)
  }

  // 插件加载完成回调
  window.pluginLoaded = (plugin: AdapterInfo) => {
    state.pluginLoading = false
  }
  // 插件卸载完成回调
  window.pluginUnloaded = () => {
    setCurrentPlugin(null)
  }

  return {
    ...toRefs(state),
    searchValue,
    onSearch,
    searchOptions,
    selectPlugin,
    unloadPlugin,
    getPluginInfo,
  }
}
export default renderPluginManager
