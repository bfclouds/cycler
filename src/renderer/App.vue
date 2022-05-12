<template>
  <div id="components-layout" class="drag">
    <SearchVue
      :searchValue="searchValue"
      :currentPlugin="currentPlugin"
      @onSearch="onSearch"
      @unloadPlugin="unloadPlugin"
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
import { nextTick, watch } from 'vue'
import { ipcRenderer } from 'electron'

const {
  searchValue,
  onSearch,
  searchOptions,

  currentPlugin,
  selectPlugin,
  unloadPlugin
} = renderPluginManager()

watch([searchOptions], () => {
  if(currentPlugin.value?.name) {
    return
  }
  nextTick(() => {
    // 根据搜索结果改变窗口大小
    ipcRenderer.invoke('msg-trigger', 'setWindowHeight', {
      height: searchOptions.value.length * 45 + 60,
    })
  })
})


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
