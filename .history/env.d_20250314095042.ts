/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const Component: ReturnType<typeof DefineComponent>
  export default Component
}
