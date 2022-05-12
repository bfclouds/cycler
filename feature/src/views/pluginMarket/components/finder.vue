<template>
  <PluginWrapperVue
    title="推荐"
    :dataList="dataList"
  ></PluginWrapperVue>
</template>
<script setup>
import PluginWrapperVue from './PluginWrapper.vue'
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