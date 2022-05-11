<template>
  <div id="components-layout">
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
import { AdapterInfo } from '@/types/type'

const {
  searchValue,
  onSearch,
  searchOptions,
  currentPlugin,
  selectPlugin,
  unloadPlugin
} = renderPluginManager()
</script>

<style lang="less">
#components-layout {
  height: 100vh;
  overflow: hidden;
  ::-webkit-scrollbar {
    width: 0;
  }
}
</style>
