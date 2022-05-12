import { ipcRenderer, IpcRenderer } from 'electron'
import throttle from 'lodash.throttle'
import { reactive, toRefs, watch } from 'vue'
import { AdapterInfo, SearchOptions } from '@/types/type'

export default () => {
  const state = reactive<{
    searchValue: string
    searchOptions: SearchOptions[]
  }>({
    searchValue: '',
    searchOptions: [],
  })

  function setSearchValue(value: string) {
    state.searchValue = value
  }

  function onSearch(value: string) {
    setSearchValue(value)
  }

  watch(
    () => state.searchValue,
    () => search(state.searchValue)
  )
  const search = throttle(async (value: string) => {
    // 获取插件列表,将搜索结果赋值给options
    if (!value) {
      state.searchOptions = []
      return
    }

    state.searchOptions = await getSearchOptionsFromPlugins(value)
  })
  async function getSearchOptionsFromPlugins(value: string) {
    // 从主进程获取plugins
    const plugins: AdapterInfo[] = await ipcRenderer.invoke(
      'LOCAL_PLUGINS',
      'getLocalPlugins',
      { value }
    )
    function onSearchValueByKey(value: string, list: string[]) {
      return list.filter((item) => item.includes(value.toLowerCase()))
    }
    const options: SearchOptions[] = []
    plugins.forEach((plugin) => {
      if (!plugin.features) {
        return
      }
      plugin.features.forEach((feature) => {
        const cmds = onSearchValueByKey(value, feature.cmds)
        if (cmds.length > 0) {
          options.push(...cmds.map((item) => ({ plugin: plugin, label: item })))
        }
      })
    })
    console.log('options>>>', options)

    // 根据搜索结果
    ipcRenderer.invoke('msg-trigger', 'setWindowHeight', {
      height: options.length * 45 + 60,
    })
    return options
  }

  return {
    ...toRefs(state),
    setSearchValue,
    onSearch,
  }
}
