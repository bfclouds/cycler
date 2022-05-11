<template>
  <div class="result_options" v-show="!currentPlugin?.name">
    <a-list>
      <a-list-item v-for="item in options" :key="item.label" @click="emit('selectPlugin', Object.assign(item.plugin, {cmd: item.label}))">
        {{ item.label }}
      </a-list-item>
    </a-list>
  </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, withDefaults } from 'vue'
import { SearchOptions, AdapterInfo } from '@/types/type'

interface ResultProps {
  options: SearchOptions[],
  currentPlugin: AdapterInfo|null
}

const emit = defineEmits(['selectPlugin'])
const props = withDefaults(defineProps<ResultProps>(), {
  options: () =>  [],
  currentPlugin: null
})
</script>

<style lang="less">
.result_options {
  background-color: rgb(245, 245, 245);
}
</style>