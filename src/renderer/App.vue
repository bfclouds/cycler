<template>
  <div id="components-layout">
    <SearchVue
      :searchValue="searchValue"
      @onSearch="onSearch"
      :currentPlugin="{}"
    ></SearchVue>
    <ResultVue
      :options="searchOptions"
    ></ResultVue>
  </div>
</template>

<script setup lang="ts">
import SearchVue from './components/Search.vue'
import ResultVue from './components/Result.vue'
import renderPluginManager from './plugins-manager'

const {
  searchValue,
  onSearch,
  searchOptions
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
