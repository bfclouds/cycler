<template>
  <div class="plugin-wrapper">
    <a-row type="flex" justify="space-between">
      <a-col>
        <h3 class="title">{{ title }}</h3>
      </a-col>
      <a-col>
        <slot>
          <a-dropdown-button>
            {{ activeSort.label }}
            <template #overlay>
              <a-menu>
                <a-menu-item v-for="option in sortOptions" :key="option.value" @click="handleMenuClick(option)">
                  {{ option.label }}
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown-button>
        </slot>
      </a-col>
    </a-row>
    <div class="plugin-list">
      <a-list :grid="{gutter: 16, column: 2}" :dataSource="dataList">
        <template #renderItem="{item}">
          <a-list-item @click="selectPlugin(item)">
            <template #actions>
              <span v-if="!localPluginsMap[item.name] && currentDownloadPlugin?.name !== item.name" class="icon iconfont icon-download_plugin" @click.stop="addPlugin(item)">&#xe9c2;</span>
              <ProgressBar v-if="currentDownloadPlugin?.name === item.name" percent=0.3></ProgressBar>
            </template>
            <a-list-item-meta>
              <template #avatar>
                <a-avatar :src="item.logo" />
              </template>
              <template #title>
                <span>{{ item.pluginName }}</span>
              </template>
              <template #description>
                <span class="ellipse">{{ item.description }}</span>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </div>
    <a-drawer
      :visible="visible"
      width="calc(100% - 200px)"
      style="height:calc(100% - 47px);top: 47px;"
      class="plugin-info"
      :title="selectedPlugin?.pluginName"
      placement="right"
      :mask="false">
        <template #closeIcon>
          <span class="icon iconfont" style="font-size: 16px;">&#xe601;</span>
        </template>
        
        {{ selectedPlugin?.name }}
  </a-drawer>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import ProgressBar from '@/components/ProgressBar.vue'
import { computed } from '@vue/reactivity'
import { useStore } from '@/store'

defineProps({
  title: {
    type: String,
    default: ''
  },
  dataList: {
    type: Array,
    default: () => []
  },
  isShowHandler: {
    type: Boolean,
    default: false
  }
})

// 插件列表排序
const sortOptions = [{
    value: 1,
    label: '最受欢迎'
  },{
    value: 2,
    label: '评分最高'
  },{
    value: 3,
    label: '最新发布'
  },{
    value: 4,
    label: '最新更新'
  }]
const activeSort = ref(sortOptions[0])
function handleMenuClick(option) {
  activeSort.value = option
}

// 选择插件
const visible = ref(false)
const selectedPlugin = ref(null)
function selectPlugin(plugin) {
  selectedPlugin.value = plugin
  visible.value = true
}
// function onClose() {
//   visible.value = false
//   // selectedPlugin.value = null
// }

// 添加插件
const currentDownloadPlugin = ref(null)
function addPlugin(plugin) {
  window.market.downloadPlugin(plugin)
  currentDownloadPlugin.value = plugin
}

// 本地已下载插件
const { state } = useStore()
const localPluginsMap = computed(() => state.localPluginsMap)

</script>

<style lang="less" scoped>
.plugin-wrapper {
  position: relative;
  .title {
    margin-bottom: 10px;
    font-size: 18px;
  }
  .ellipse {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
  :deep(.ant-list-item){
    display: flex !important;
    .icon-download_plugin {
      font-size: 18px;
      color: rgb(46, 129, 230);
      cursor: pointer;
    }
  }
  .plugin-info {
    position: absolute;
  }
}
</style>