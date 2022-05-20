<template>
  <div id="components-layout" class="drag">
    <SearchVue
      :searchValue="searchValue"
      :currentPlugin="currentPlugin"
      :menuPlugin="menuPlugin"
      @onSearch="onSearch"
      @unloadPlugin="unloadPlugin"
      @openMenu="openMenu"
    ></SearchVue>
    <ResultVue
      :options="searchOptions"
      :currentPlugin="currentPlugin"
      @selectPlugin="selectPlugin"
    ></ResultVue>
  </div>
</template>

<script setup lang="ts">
import SearchVue from './components/Search.vue'
import ResultVue from './components/Result.vue'
import renderPluginManager from './plugins-manager'
import { nextTick, onMounted, toRaw, ref, watch } from 'vue'
import { ipcRenderer } from 'electron'
import { AdapterInfo } from '@/types/type'

const {
  searchValue,
  onSearch,
  searchOptions,

  currentPlugin,
  selectPlugin,
  unloadPlugin,
  getPluginInfo,
} = renderPluginManager()
watch([searchOptions], () => {
  if (currentPlugin.value?.name) {
    return
  }
  nextTick(() => {
    // 根据搜索结果改变窗口大小
    ipcRenderer.invoke('msg-trigger', 'setWindowHeight', {
      height: searchOptions.value.length * 45 + 60,
    })
  })
})

const selectedOpionPlugin = ref()
const menuPlugin = ref<AdapterInfo | null>(null)
onMounted(async () => {
  menuPlugin.value = getPluginInfo(
    '系统菜单',
    // eslint-disable-next-line no-undef
    `${__static}/feature/package.json`
  )
})
function openMenu() {
  if (!menuPlugin.value) {
    return
  }
  selectPlugin({
    ...toRaw(menuPlugin.value),
    cmd: '插件市场',
  })
}
</script>

<style lang="less">
#components-layout {
  height: 100vh;
  overflow: hidden;
  ::-webkit-scrollbar {
    width: 0;
  }
  &.drag {
    -webkit-app-region: drag;
  }
}
</style>
