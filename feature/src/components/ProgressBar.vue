<template>
  <svg
    :width="radius"
    :height="radius"
    viewBox="0 0 100 100"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      class="progress-background"
      cx="50"
      cy="50"
      r="50"
      fill="transparent"
    />
    <circle
      class="progress-bar"
      :style="{stroke: color}"
      cx="50"
      cy="50"
      r="50"
      fill="transparent"
      :stroke-dasharray="dashArray"
      :stroke-dashoffset="dashOffset"
    />
  </svg>
</template>
<script setup>
import { computed, ref, defineProps } from 'vue'

const props = defineProps({
  percent: {
    type: Number,
    default: 0.01,
  },
  radius: {
    type: Number,
    default: 20,
  },
  color: {
    type: String,
    default: '#1d8c01'
  }
})
const dashArray = ref(Math.PI * 100)
const dashOffset = computed(() => (1 - props.percent) * dashArray.value)
</script>

<style lang="less" scoped>
circle {
  stroke-width: 8px;
  background-color: #ccc;
  &.progress-background {
    transform: scale(0.9);
    transform-origin: center;
    stroke: rgba(196, 196, 196, 0.5);
  }
  &.progress-bar {
    transform: scale(0.9);
    transform-origin: center;
  }
}
</style>
