<template>
  <div class="result_options" v-show="!currentPlugin?.name">
    <a-list>
      <a-list-item v-for="item in options" :key="item">
        {{ item }}
      </a-list-item>
    </a-list>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    default: () => []
  },
  currentPlugin: {
    type: Object,
    default: () => null
  }
})
</script>

<style lang="less">
.result_options {
  background-color: rgb(245, 245, 245);
}
</style>