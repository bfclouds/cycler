<template>
  <div class="my-plugin">
    <a-row>
      <a-col :span="8">
        <div class="left-menu">
          <a-list :dataSource="dataList">
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
      <a-col :span="16">
        <div class="content">
          <div class="handler-wrapper">
            <a-row justify="end">
              <a-col :span="4">
                <a-button type="primary">删除插件</a-button>
              </a-col>
            </a-row>
          </div>
          <div class="feature-wrapper">
            <h4 class="title">功能关键字</h4>
            <div class="feature-list" v-for="feature in activePlugin?.features">
              <h3>{{ feature.explain }}</h3>
              <ul>
                <li v-for="cmd in feature.cmds">
                  {{ typeof cmd === 'string' ? cmd : cmd?.label }}
                </li>
              </ul>
            </div>
          </div>
        </div>
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
  // return total
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
  width: 100%;
  .left-menu,
  .content {
    height: calc(100vh - 47px);
    overflow-y: scroll;
  }
  .left-menu {
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    .ellipse {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
    }

    :deep(.ant-list-split .plugin-item) {
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
  .content {
    display: flex;
    padding: 0 10px;
    flex-direction: column;
    ::-webkit-scrollbar,
    ::-webkit-scrollbar-corner,
    ::-webkit-resizer {
      display: none;
    }
    .handler-wrapper {
      padding: 10px 0;
      border-bottom: 1px solid #f0f1f2;
    }
    .feature-wrapper {
      flex: 1;
      overflow-y: scroll;
      .title {
        padding: 10px 0;
        text-align: center;
        color: rgb(118, 118, 118);
      }
      .feature-list {
        ul {
          display: flex;
          flex-wrap: wrap;
          list-style: none;
          padding: 0;
          li {
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
            margin-right: 20px;
            margin-bottom: 10px;
            border-radius: 15px;
            background-color: rgb(236, 236, 236);
            cursor: pointer;
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>
