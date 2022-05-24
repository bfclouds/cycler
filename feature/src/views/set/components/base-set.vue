<template>
  <div class="base-set set-card">
    <a-card title="快捷键" :bordered="false">
      <a-row type="flex" justify="space-between">
        <a-col>显示/隐藏快捷键</a-col>
        <a-col>
          <a-button size="small">Control+Space</a-button>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-between">
        <a-col>分离窗口快捷键</a-col>
        <a-col>
          <a-button size="small">Default Button</a-button>
        </a-col>
      </a-row>
    </a-card>

    <a-divider />

    <a-card title="常规" :bordered="false">
      <a-row type="flex" justify="space-between">
        <a-col>开机自启动</a-col>
        <a-col>
          <a-switch
            v-model:checked="isAutoStartValue"
            checked-children="开"
            un-checked-children="关"
          />
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-between">
        <a-col>本地文件搜索</a-col>
        <a-col>
          <a-switch
            v-model:checked="isSearchLocalFileValue"
            checked-children="开"
            un-checked-children="关"
          />
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-between">
        <a-col>自动粘贴到搜索框</a-col>
        <a-col>
          <a-select
            v-model:value="autoPasteValue.value"
            size="small"
            style="width: 200px"
            :options="autoPasteInputOptions"
          ></a-select>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-between">
        <a-col>自动恢复搜索框形态</a-col>
        <a-col>
          <a-select
            v-model:value="autoResetSearchInputValue.value"
            size="small"
            style="width: 200px"
            :options="autoResetSearchInputOptions"
          ></a-select>
        </a-col>
      </a-row>
    </a-card>

    <a-divider />

    <a-card title="样式" :bordered="false">
      <a-row type="flex" justify="space-between">
        <a-col>主题</a-col>
        <a-col>
          <a-select
            v-model:value="themeValue.value"
            size="small"
            style="width: 200px"
            :options="themeOptions"
          ></a-select>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-between">
        <a-col>窗口不透明度</a-col>
        <a-col style="width: 200px">
          <a-slider
            v-model:value="systemOpacityValue"
            :min="0"
            :max="1"
            :step="0.01"
          />
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import {
  autoPasteInputOptions,
  autoResetSearchInputOptions,
  themeOptions,
} from '../options'

const autoPasteValue = ref(autoPasteInputOptions[0])
const autoResetSearchInputValue = ref(autoResetSearchInputOptions[0])
const isAutoStartValue = ref(false)
const isSearchLocalFileValue = ref(false)
const themeValue = ref(themeOptions[0])
const systemOpacityValue = ref(0)
</script>

<style lang="less" scoped>
@import '~@/assets/css/common.less';

.base-set {
  .ant-row {
    margin-bottom: 10px;
  }
}
</style>
