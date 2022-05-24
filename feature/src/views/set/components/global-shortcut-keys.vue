<template>
  <div class="global-shortcut-keys set-card">
    <a-card title="全局关键字" :bordered="false">
      <template v-for="(item, index) in globalShortcutKeys" :key="index">
        <a-row style="margin-bottom: 20px" type="flex" :gutter="[10, 0]">
          <a-col :flex="1">
            <a-button
              :class="{ active: item.isActiveShortcutKey }"
              style="width: 100%"
              @click.stop="handler(item, 'shortcutKey')"
            >
              <span></span>
              <div class="enter-shortcutkey-tips">
                <p>
                  1.
                  先按功能键(Control、Option、Command、Shift)，再按其他普通按键
                </p>
                <p>2. 双击功能键Control、Option、Command、Shift</p>
                <p>3. 按F1-F12单键</p>
              </div>
            </a-button>
          </a-col>
          <a-col :flex="1">
            <a-input
              v-model:value="item.keyValue"
              placeholder="Basic usage"
              @focusin="handler(item, 'keyValue')"
            />
          </a-col>
          <a-col class="align-center">
            <a-switch
              style="margin: auto"
              v-bind:checked="item.isStartAutoCopy"
              @update:checked="(val) => handler(item, 'isStartAutoCopy', val)"
              checked-children="开"
              un-checked-children="关"
            />
          </a-col>
          <a-col class="align-center">
            <span
              class="icon iconfont"
              style="font-size: 18px; font-weight: 600; cursor: pointer"
              @click="handler(item, 'delete', index)"
              >&#xe602;</span
            >
          </a-col>
        </a-row>
      </template>
    </a-card>
    <a-card :bordered="false" style="margin-top: 20px">
      <a-button type="primary" @click="addShortcutKey">新增</a-button>
    </a-card>
  </div>
</template>
<script setup>
import { onBeforeMount, onMounted, reactive, ref, watch } from 'vue'

const selectedShortcutKey = ref({})
const globalShortcutKeys = reactive([])
// let listenShortcutKey = true

function handler(shortKey, type, value) {
  selectedShortcutKey.value = shortKey
  if (type === 'shortcutKey') {
    // console.log()
    shortKey.isActiveShortcutKey = true
  } else if (type === 'keyValue') {
    // console.log()
  } else if (type === 'isStartAutoCopy') {
    shortKey.isStartAutoCopy = value
  } else if (type === 'delete') {
    globalShortcutKeys.splice(value, 1)
  }
  // console.log(type, value)
}

watch(
  () => globalShortcutKeys,
  () => {
    console.log(globalShortcutKeys)
  },
  {
    deep: true,
  }
)

function addShortcutKey() {
  globalShortcutKeys.push({
    shortcutKey: [],
    isActiveShortcutKey: false,
    keyValue: '',
    isStartAutoCopy: false,
  })
}

function closeListenShortcutKey() {
  selectedShortcutKey.value.isActiveShortcutKey = false
}
onMounted(() => {
  document.addEventListener('click', closeListenShortcutKey)
})
onBeforeMount(() => {
  document.removeEventListener('click', closeListenShortcutKey)
})
</script>

<style lang="less" scoped>
@import '~@/assets/css/common.less';

.enter-shortcutkey-tips {
  display: none;
  position: absolute;
  left: 0;
  top: 40px;
  background-color: #fff;
  text-align: start;
  border: 1px solid #ccc;
  padding: 6px;
  border-radius: 4px;
  font-size: 12px;
  color: #000;
  box-shadow: 0 0 8px 2px #ccc;
  z-index: 10;
  p {
    margin-bottom: 0;
  }
}
.ant-btn:focus {
  position: relative;
  .enter-shortcutkey-tips {
    display: block;
  }
}
</style>
