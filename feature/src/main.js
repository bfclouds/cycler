import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'assets/css/iconfont.css'
import Antd from 'ant-design-vue'
import 'assets/css/ant-reset.less'
import { storeSymbol, createStore } from '@/store'

const app = createApp(App)
app.provide(storeSymbol, createStore())
app.use(router).use(Antd)
app.mount('#app')
