<template>
  <div class="plugin-market">
    <div class="left-menu">
      <div class="search-container">
        <a-input
          v-model:value="searchValue"
          placeholder="搜索插件"
          style="width: 100%"
        >
          <template #suffix >
             <a-button shape="circle" @click="onSearch" style="border: none;">
              <template #icon>
                <span class="icon iconfont" style="cursor: pointer;">&#xe61f;</span>
              </template>
            </a-button>
          </template> 
        </a-input>
      </div>
      <a-menu v-model:selectedKeys="current" mode="inline">
        <a-menu-item key="finder">
          <template #icon>
            <span class="icon iconfont">&#xe603;</span>
          </template>
          探索
        </a-menu-item>
        <a-menu-item key="worker">
          <template #icon>
            <span class="icon iconfont">&#xe606;</span>
          </template>
          生产效率
        </a-menu-item>
        <a-menu-item key="tools">
          <template #icon>
            <span class="icon iconfont">&#xe61f;</span>
          </template>
          搜索工具
        </a-menu-item>
        <a-menu-item key="image">
          <template #icon>
            <span class="icon iconfont">&#xe6b2;</span>
          </template>
          图像
        </a-menu-item>
        <a-menu-item key="dev">
          <template #icon>
            <span class="icon iconfont">&#xec2e;</span>
          </template>
          开发
        </a-menu-item>
        <a-menu-item key="system">
          <template #icon>
            <span class="icon iconfont">&#xe6da;</span>
          </template>
          创意
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
import FinderVue from './components/finder.vue'
import WorkerVue from './components/worker.vue'
import ToolsVue from './components/tools.vue'
import ImageVue from './components/image.vue'
import DevVue from './components/dev.vue'
import SystemVue from './components/system.vue'

const componentsMap = {
  finder: FinderVue,
  worker: WorkerVue,
  tools: ToolsVue,
  image: ImageVue,
  dev: DevVue,
  system: SystemVue
}

const current = ref(['finder'])
const searchValue = ref('')
function onSearch() {
  console.log(searchValue.value);
}
</script>

<style lang="less" scoped>
@import "~@/assets/css/common.less";

.plugin-market {
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: calc(~"100vh - 48px");
  background: #F3EFEF;
  box-sizing: border-box;
  .container {
    flex: 1;
    height: 100%;
    padding: 20px;
    background-color: #fff;
  }
}
</style>