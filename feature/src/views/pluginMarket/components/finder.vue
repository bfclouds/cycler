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
import { onMounted, ref } from 'vue'
import total from '@/assets/api/total.json'
// https://gitee.com/api/v5/repos/monkeyWang/rubick-database/commits/master

const dataList = ref([])

onMounted(() => {
  console.log(total)
  dataList.value = total
})
</script>