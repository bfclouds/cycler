import { createApp } from 'vue'
import App from '../renderer/App.vue'
import { Button, List, Spin, Input, Avatar, Tag } from "ant-design-vue";
import 'ant-design-vue/dist/antd.css'

createApp(App)
.use(Button)
.use(List)
.use(Spin)
.use(Input)
.use(Avatar)
.use(Tag)
.mount("#app")
