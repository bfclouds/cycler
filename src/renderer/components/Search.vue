<template>
  <div class="search-wrapper">
    <div class="search-tag" v-show="currentPlugin?.cmd">
      {{ currentPlugin?.cmd }}
    </div>
    <a-input
      id="search"
      class="main-input"
      :value="searchValue"
      @input="changeInput"
      placeholder="嘿，输入点啥~">
      <template #suffix>
        <div class="suffix-tool">
          logo
        </div>
      </template>
    </a-input>
  </div>
</template>

<script lang="ts">
import { CurrentPluginType, CInputEvent } from '@/type'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    currentPlugin: {
      type: Object as PropType<CurrentPluginType>
    },
    searchValue: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    console.log(props);

    function changeInput(event: CInputEvent) {
      console.log(event.target.value);
    }

    return {
      changeInput
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