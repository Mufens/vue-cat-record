import '@/assets/element/main.scss'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { createApp } from 'vue'
import pinia from '@/stores/index'

import App from './App.vue'
import router from './router'
import ECharts from 'vue-echarts'
import { isHasButton } from '@/directive/has'
const app = createApp(App)
app.component('v-chart', ECharts)
app.use(pinia)
app.use(router)
app.use(isHasButton)
app.mount('#app')
