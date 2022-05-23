<template>
  <div class="my-plugin">
    <a-row :gutter="[24]">
      <a-col :span="12">
        <div class="left-menu">
          <a-list :grid="{ gutter: 16, column: 1 }" :dataSource="dataList">
            <template #renderItem="{ item }">
              <a-list-item
                @click="setActivePlugin(item)"
                class="plugin-item"
                :class="{ active: activePlugin?.name === item.name }"
              >
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
      </a-col>
      <a-col :span="12">
        {{ activePlugin?.name }}
      </a-col>
    </a-row>
  </div>
</template>
<script setup>
// import total from '@/assets/api/total.json'
import { onMounted, ref } from 'vue'
import { useStore } from '@/store'
import { computed } from '@vue/reactivity'

const { state } = useStore()

const dataList = computed(() => {
  const map = state.localPluginsMap
  const keys = Object.keys(map)
  return keys.map((key) => map[key])
})
const activePlugin = ref(null)
onMounted(() => {
  setActivePlugin(dataList.value[0])
})

function setActivePlugin(plugin) {
  console.log(plugin)
  activePlugin.value = plugin
}
</script>

<style lang="less" scoped>
@import '~@/assets/css/common.less';

.my-plugin {
  .left-menu {
    width: 100%;
    height: calc(100vh - 47px);
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .ellipse {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
  :deep(.ant-col > .plugin-item) {
    padding: 10px 10px 0;
    margin-bottom: 0;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    &.active {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
