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
                <a-menu-item
                  v-for="option in sortOptions"
                  :key="option.value"
                  @click="handleMenuClick(option)"
                >
                  {{ option.label }}
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown-button>
        </slot>
      </a-col>
    </a-row>
    <div class="plugin-list">
      <a-list :grid="{ gutter: 16, column: 2 }" :dataSource="dataList">
        <template #renderItem="{ item }">
          <a-list-item @click="selectPlugin(item)">
            <template #actions>
              <ProgressBar
                v-if="item.isLoading"
                :percent="item.downloadPrecent"
              ></ProgressBar>
              <span
                v-else-if="!localPluginsMap[item.name]"
                class="icon iconfont icon-download_plugin"
                @click.stop="installPlugin(item)"
                >&#xe9c2;</span
              >
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
      style="height: calc(100% - 47px); top: 47px"
      class="plugin-info"
      placement="right"
      :mask="false"
    >
      <template #closeIcon>
        <span
          class="icon iconfont"
          style="font-size: 16px; color: #000"
          @click="onClosePluginDetail"
          >&#xe601;</span
        >
      </template>
      <template #title>
        <a-row type="flex" justify="space-between">
          <a-col>{{ selectedPlugin.pluginName }}</a-col>
          <a-col>
            <ProgressBar
              v-if="selectedPlugin.isLoading"
              :color="selectedPlugin.isDownload ? '#1d8c01' : '#790000'"
              :percent="selectedPlugin.downloadPrecent"
            ></ProgressBar>
            <span
              v-else-if="!localPluginsMap[selectedPlugin.name]"
              class="icon iconfont icon-download_plugin"
              @click.stop="installPlugin(selectedPlugin)"
              >&#xe9c2;</span
            >
            <span
              v-else
              class="icon iconfont"
              style="cursor: pointer; font-size: 18px; font-weight: 700"
              @click="uninstallPlugin(selectedPlugin)"
              >&#xe602;</span
            >
          </a-col>
        </a-row>
      </template>
      <div v-html="selectedPlugin?.detailContent"></div>
    </a-drawer>
  </div>
</template>

<script setup>
import { defineProps, nextTick, ref } from 'vue'
import ProgressBar from '@/components/ProgressBar.vue'
import { computed } from '@vue/reactivity'
import { useStore } from '@/store'
import api from '@/utils/api'
import MarkdownIt from 'markdown-it'

defineProps({
  title: {
    type: String,
    default: '',
  },
  dataList: {
    type: Array,
    default: () => [],
  },
  isShowHandler: {
    type: Boolean,
    default: false,
  },
})

// 插件列表排序
const sortOptions = [
  {
    value: 1,
    label: '最受欢迎',
  },
  {
    value: 2,
    label: '评分最高',
  },
  {
    value: 3,
    label: '最新发布',
  },
  {
    value: 4,
    label: '最新更新',
  },
]
const activeSort = ref(sortOptions[0])
function handleMenuClick(option) {
  activeSort.value = option
}

// 选择插件
const visible = ref(false)
const selectedPlugin = ref(null)
const markdown = new MarkdownIt()

function selectPlugin(plugin) {
  selectedPlugin.value = plugin
  if (plugin.homePage) {
    api
      .getPluginDetail(plugin.homePage)
      .then((res) => {
        selectedPlugin.value.detailContent = markdown.render(res || '暂无内容')
      })
      .catch((err) => {
        selectedPlugin.value.detailContent = markdown.render(err || '暂无内容')
      })
  }

  visible.value = true
}
function onClosePluginDetail() {
  visible.value = false
}

// 添加插件
const { state, getLocalPlugin } = useStore()
const localPluginsMap = computed(() => state.localPluginsMap)

function pluginCommonHandler(plugin, isDownload) {
  plugin.err = false
  plugin.isLoading = true
  plugin.downloadPrecent = 0
  plugin.downloadPrecentSpped = 0.01
  plugin.isDownload = isDownload
  // 开启动画
  changePrecentAnimation(plugin)
}

function installPlugin(plugin) {
  try {
    pluginCommonHandler(plugin, true)
    // 开始下载插件
    window.market
      .downloadPlugin(plugin)
      .then(async () => {
        await getLocalPlugin()
        plugin.downloadPrecent = 1
      })
      .finally(() => {
        nextTick(() => {
          clearInterval(plugin.timer)
          plugin.isLoading = false
        })
      })
  } catch (err) {
    plugin.err = true
  }
}
// 卸载插件
function uninstallPlugin(plugin) {
  pluginCommonHandler(plugin, false)
  window.market
    .removePlugin(plugin.name)
    .then(async () => {
      await getLocalPlugin()
      plugin.downloadPrecent = 1
    })
    .finally(() => {
      nextTick(() => {
        clearInterval(plugin.timer)
        plugin.isLoading = false
      })
    })
}

function changePrecentAnimation(plugin) {
  plugin.timer = setInterval(() => {
    if (plugin.downloadPrecent >= 0.95) {
      clearInterval(plugin.timer)
    } else if (plugin.downloadPrecent >= 0.8) {
      plugin.downloadPrecentSpped = 0.005
    }
    plugin.downloadPrecent += plugin.downloadPrecentSpped
  }, 60)
}
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
  :deep(.ant-list-item) {
    display: flex !important;
  }
  .plugin-info {
    position: absolute;
  }
}
.icon-download_plugin {
  font-size: 18px;
  color: rgb(46, 129, 230);
  cursor: pointer;
}
</style>
