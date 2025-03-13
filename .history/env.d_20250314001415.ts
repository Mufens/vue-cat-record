/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  // 使用更严格的类型
  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>
  export default component
}
