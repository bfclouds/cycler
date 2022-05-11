import search from './search'
import { AdapterInfo } from '@/types/type'
import { ipcRenderer } from 'electron'
import { reactive, toRefs } from 'vue'

interface Sate {
  currentPlugin: AdapterInfo | null
}

const renderPluginManager = () => {
  const state = reactive<Sate>({
    currentPlugin: null,
  })
  function setCurrentPlugin(plugin: AdapterInfo | null) {
    state.currentPlugin = plugin
  }

  const { searchValue, setSearchValue, onSearch, searchOptions } = search()

  async function selectPlugin(plugin: { label: string; plugin: AdapterInfo }) {
    await ipcRenderer.invoke(
      'msg-trigger',
      'loadPlugin',
      JSON.parse(JSON.stringify(plugin))
    )
  }
  async function unloadPlugin() {
    await ipcRenderer.invoke('msg-trigger', 'unloadPlugin')
  }

  // 插件加载完成回调
  window.pluginLoaded = (plugin: AdapterInfo) => {
    setSearchValue('')
    state.currentPlugin = plugin
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
  }
}
export default renderPluginManager
