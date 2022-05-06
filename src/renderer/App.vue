<template>
  <div id="components-layout">
    <SearchVue
      :current-plugin="state.currentPlugin"
      :search-value="state.searchValue"
      @input="e => changeValue(e)"
      ></SearchVue>
    <ResultVue></ResultVue>
  </div>
</template>

<script setup lang="ts">
import { ipcRenderer } from 'electron'
import { reactive, defineEmits } from 'vue'
import { PluginType, CInputEvent } from '@/type'
import SearchVue from './components/Search.vue'
import ResultVue from './components/Result.vue'

const state = reactive<PluginType>({
  searchValue: 'cjsc',
  currentPlugin: {
    cmd: '插件市场'
  }
})

const emit = defineEmits([
  'onSearch'
])

function changeValue(event: CInputEvent) {
  targetSearch({ value: event.target.value })
  emit('onSearch', event);
}
function targetSearch({ value }: { value: string }) {
  if(state.currentPlugin.name) {
    return ipcRenderer.sendSync('', {

    })
  }
  console.log(value);
  
}

console.log(state.searchValue, state.currentPlugin);

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
