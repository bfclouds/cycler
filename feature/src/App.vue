<template>
  <div id="nav">
    <a-menu v-model:selectedKeys="current" mode="horizontal" @select="({key}) => changeMenu(key)">
      <a-menu-item key="plugin-market">
        <template #icon>
          <span style="font-weight: 700;" class="icon iconfont">&#xe69d;</span>
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
          <span style="font-size: 18px;" class="icon iconfont">&#xe8b8;</span>
        </template>
        便好设置
      </a-menu-item>
      <a-menu-item key="user">
        <template #icon>
          <span style="font-size: 18px;" class="icon iconfont">&#xe68b;</span>
        </template>
        账号与数据
      </a-menu-item>
    </a-menu>
  </div>
  <router-view/>
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
  #nav {
    .iconfont {
      display: inline-block;
      vertical-align: middle;
      font-size: 16px;
    }
  }
}
</style>
