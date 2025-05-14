import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      vueDevTools(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
            directives: true,
          }),
        ],
      }),
      viteMockServe({
        mockPath: './src/mock',
        enable: command === 'serve',
        watchFiles: true,
      }),
    ],

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 2. 自动导入定制化样式文件进行样式覆盖
          additionalData: `
       @use "@/assets/element/various.scss" as *;

        `,
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'element-plus': ['element-plus'],
            'echarts-core': ['echarts/core'], // 核心
            'echarts-charts': ['echarts/charts'], // 图表
            'echarts-components': ['echarts/components'], // 组件
            'echarts-renderer': ['echarts/renderers'], // 渲染器
            'vue-echarts': ['vue-echarts'],
            vendors: ['axios', 'pinia', 'vue-router', 'sortablejs'],
          },
        },
      },
    },
  }
})
