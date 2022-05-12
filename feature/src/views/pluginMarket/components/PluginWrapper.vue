<template>
  <div class="plugin-wrapper">
    <h3 class="title">{{ title }}</h3>
    <div class="plugin-list">
      <a-list :grid="{gutter: 16, column: 2}" :dataSource="dataList">
        <template #renderItem="{item}">
          <a-list-item>
            <template #actions>
              <span class="icon iconfont icon-download_plugin" >&#xe9c2;</span>
            </template>
            <a-list-item-meta>
              <template #avatar>
                logo
                <!-- <a-avatar :src="item.picture.large" /> -->
              </template>
              <template #title>
                <span>{{ item.title }}</span>
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
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    default: ''
  },
  dataList: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="less" scoped>
.plugin-wrapper {
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