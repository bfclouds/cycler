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
          <a-list-item>
            <template #actions>
              <span class="icon iconfont icon-download_plugin" @click="addPlugin(item)">&#xe9c2;</span>
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
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'

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
const sortOptions = ref([{
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
)
const activeSort = ref(sortOptions.value[0])
function handleMenuClick(option) {
  activeSort.value = option
}

function addPlugin(plugin) {
  console.log('惦记了添加插件》〉》');
  window.market.downloadPlugin(plugin)
}

</script>

<style lang="less" scoped>
.plugin-wrapper {
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
}
</style>