<template>
  <div class="search-wrapper">
    <div class="search-tag" v-show="currentPlugin?.cmd">
      {{ currentPlugin?.cmd }}
    </div>
    <a-input
      id="search"
      class="main-input"
      :value="searchValue"
      @input="onInputValue"
      placeholder="嘿，输入点啥~"
    >
      <template #suffix>
        <div class="suffix-tool">logo</div>
      </template>
    </a-input>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { HtmlInputEvent } from '@/types/type'

export default defineComponent({
  props: {
    currentPlugin: {
      type: Object,
    },
    searchValue: {
      type: String,
      default: '',
    },
  },
  emits: ['onSearch'],
  setup(props, { emit }) {
    function onInputValue(event: HtmlInputEvent) {
      emit('onSearch', event.target.value)
    }

    return {
      onInputValue
    }
  }
})
</script>

<style lang="less">
.search-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 18px;
  .search-tag {
    white-space: pre;
    user-select: none;
    border-radius: 16px;
    height: 32px;
    position: relative;
    color: #fff;
    background-color: rgba(255, 152, 78, 0.8);
    display: inline-flex;
    align-items: center;
    margin-right: 1px;
    padding: 0 10px;
  }
  .main-input {
    flex: 1;
    height: 60px !important;
    box-sizing: border-box;
    border: none;
    outline: none;
    box-shadow: none !important;
    .ant-select-selection,
    .ant-input,
    .ant-select-selection__rendered {
      height: 100% !important;
      font-size: 22px;
      border: none !important;
    }
  }
  .ant-input:focus {
    border: none;
    box-shadow: none;
  }
}
</style>
