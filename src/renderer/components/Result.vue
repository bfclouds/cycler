<template>
  <div class="result_options" v-show="!currentPlugin?.name">
    <a-list>
      <a-list-item>
        1111
      </a-list-item>
      <a-list-item>
        2222
      </a-list-item>
    </a-list>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  options: {
    type: [],
    default: () => []
  },
  currentPlugin: {
    type: Object,
    default: () => null
  }
})

console.log(props.options);
</script>

<style lang="less">
.result_options {
  background-color: rgb(245, 245, 245);
}
</style>