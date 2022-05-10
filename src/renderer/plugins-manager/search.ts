import { ipcRenderer, IpcRenderer } from 'electron'
import throttle from 'lodash.throttle'
import { reactive, toRefs, watch } from 'vue'
import { AdapterInfo } from '@/types/type'

export default () => {
  const state = reactive<{
    searchValue: string,
    searchOptions: any[]
  }>({
    searchValue: '',
    searchOptions: [],
  })

  function onSearch(value: string) {
    state.searchValue = value
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

    console.log(value, state.searchOptions);
    
  })
  async function getSearchOptionsFromPlugins(value: string) {
    // 从主进程获取plugins
    const plugins: AdapterInfo[] = await ipcRenderer.invoke('LOCAL_PLUGINS', 'getLocalPlugins', {value})


    console.log('plugins>>> ', plugins);
    

    function onSearchValueByKey(value: string, list: string[]) {
      return list.filter(item => item.includes(value.toLowerCase()))
    }

    let options: any[] = []

    // const plugins = [
    //   {
    //     name: 'rubick-system-feature',
    //     pluginName: 'rubick 系统菜单',
    //     description: 'rubick 系统菜单',
    //     main: 'index.html',
    //     logo: 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/acb761082f4a4b46847e7cd8b180f63c~tplv-k3u1fbpfcp-watermark.image',
    //     version: '0.0.0',
    //     preload: 'preload.js',
    //     pluginType: 'ui',
    //     features: [
    //       { code: 'market', explain: 'rubick 插件市场', cmds: ['插件市场'] },
    //       {
    //         code: 'installed',
    //         explain: 'rubick 已安装插件',
    //         cmds: ['已安装插件'],
    //       },
    //       { code: 'settings', explain: 'rubick 偏好设置', cmds: ['偏好设置'] },
    //     ],
    //     icon: 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/acb761082f4a4b46847e7cd8b180f63c~tplv-k3u1fbpfcp-watermark.image',
    //     indexPath: 'http://localhost:8081/#/',
    //   },
    // ]
    
    plugins.forEach(plugin =>{
      if (!plugin.features) {
        return
      }
      plugin.features.forEach(feature => {
        const cmds = onSearchValueByKey(value, feature.cmds)
        console.log('cmds>>>> ', cmds);
        
        options = options.concat(cmds)
      })
    })
    return options
  }

  return {
    ...toRefs(state),
    onSearch,
  }
}
