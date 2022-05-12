<template>
  <PluginWrapperVue
    title="推荐"
    :dataList="dataList"
  >
    <a-button type="text" style="color: #0088ff;">查看全部</a-button>
  </PluginWrapperVue>
</template>
<script setup>
import PluginWrapperVue from './plugin-wrapper.vue'
import { ref } from 'vue'

const dataList = ref([{
  title: '颜色助手',
  logo: '',
  description: '颜色信息、ui色卡、传统色、渐变色等等'
}, {
  title: '书签',
  logo: '',
  description: '记录生活'
}])
</script>