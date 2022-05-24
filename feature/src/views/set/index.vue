<template>
  <div class="set">
    <div class="left-menu">
      <a-menu v-model:selectedKeys="current" mode="inline">
        <a-menu-item key="base-set">
          <template #icon>
            <span class="icon iconfont" style="font-size: 12px">&#xe7e6;</span>
          </template>
          基本设置
        </a-menu-item>
        <a-menu-item key="super-panel">
          <template #icon>
            <span class="icon iconfont">&#xe6c2;</span>
          </template>
          超级面板
        </a-menu-item>
        <a-menu-item key="global-shortcut-keys">
          <template #icon>
            <span class="icon iconfont">&#xe60a;</span>
          </template>
          全局快捷键
        </a-menu-item>
        <a-menu-item key="local-file-start">
          <template #icon>
            <span class="icon iconfont">&#xe67a;</span>
          </template>
          本地文件启动
        </a-menu-item>
        <a-menu-item key="all-keys">
          <template #icon>
            <span class="icon iconfont" style="font-size: 12px">&#xe67c;</span>
          </template>
          所有关键字
        </a-menu-item>
      </a-menu>
    </div>
    <div class="container">
      <component :is="componentsMap[current[0]]"></component>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AllKeys from './components/all-keys.vue'
import BaseSet from './components/base-set.vue'
import GlobalShortcutKeys from './components/global-shortcut-keys.vue'
import LocalFileStart from './components/local-file-start.vue'
import SuperPanel from './components/super-panel.vue'

const current = ref(['base-set'])
const componentsMap = {
  'base-set': BaseSet,
  'all-keys': AllKeys,
  'global-shortcut-keys': GlobalShortcutKeys,
  'local-file-start': LocalFileStart,
  'super-panel': SuperPanel,
}
</script>

<style lang="less" scoped>
@import '~@/assets/css/common.less';

.set {
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: calc(~'100vh - 48px');
  background: #f3efef;
  box-sizing: border-box;
  .container {
    flex: 1;
    height: 100%;
    padding: 20px;
    overflow-y: scroll;
    background-color: #fff;
  }
}
</style>
