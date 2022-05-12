import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'assets/css/iconfont.css'
import Antd from 'ant-design-vue'
import 'assets/css/ant-reset.less'

createApp(App).use(router).use(Antd).mount('#app')
