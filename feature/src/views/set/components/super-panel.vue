<template>
  <div class="super-panel set-card">
    <a-card title="超级面板" :bordered="false">
      <a-row type="flex" justify="space-between">
        <a-col>开启/关闭超级面板</a-col>
        <a-col>
          <a-switch
            v-model:checked="isStartSuperPanelValue"
            checked-children="开"
            un-checked-children="关"
          />
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-between">
        <a-col>英文快速翻译</a-col>
        <a-col>
          <a-switch
            v-model:checked="isStartTranslateValue"
            checked-children="开"
            un-checked-children="关"
          />
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-between">
        <a-col>弹出面板方式</a-col>
        <a-col>
          <a-select
            v-model:value="activeSuperPanelTypeValue.value"
            size="small"
            style="width: 200px"
            :options="activeSuperPabelTypeOptions"
          ></a-select>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { activeSuperPabelTypeOptions } from '../options'

const isStartSuperPanelValue = ref(false)
const isStartTranslateValue = ref(false)
const activeSuperPanelTypeValue = ref(activeSuperPabelTypeOptions[0])
</script>

<style lang="less" scoped>
.ant-row {
  margin-bottom: 10px;
}
</style>
