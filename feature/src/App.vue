<template>
  <div id="nav">
    <a-menu
      v-model:selectedKeys="current"
      mode="horizontal"
      @select="({ key }) => changeMenu(key)"
    >
      <a-menu-item key="plugin-market">
        <template #icon>
          <span style="font-weight: 700" class="icon iconfont">&#xe69d;</span>
        </template>
        插件应用市场
      </a-menu-item>
      <a-menu-item key="my-plugin">
        <template #icon>
          <span class="icon iconfont">&#xe600;</span>
        </template>
        我的插件应用
      </a-menu-item>
      <a-menu-item key="set">
        <template #icon>
          <span style="font-size: 18px" class="icon iconfont">&#xe8b8;</span>
        </template>
        偏好设置
      </a-menu-item>
      <a-menu-item key="user">
        <template #icon>
          <span style="font-size: 18px" class="icon iconfont">&#xe68b;</span>
        </template>
        账号与数据
      </a-menu-item>
    </a-menu>
  </div>
  <router-view />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'

const router = useRouter()
const current = ref(['plugin-market'])
function changeMenu(key) {
  router.push(key)
}

const { getLocalPlugin } = useStore()
onMounted(() => {
  getLocalPlugin()
})
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  user-select: none;
  // overflow: hidden;
  #nav {
    .iconfont {
      display: inline-block;
      vertical-align: middle;
      font-size: 16px;
    }
  }
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(141, 141, 141, 0.3);
    // border-radius: 10px;
    background-color: #f5f5f5;
  }
  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgb(170, 169, 169);
  }
}
* {
  box-sizing: border-box;
}
</style>
