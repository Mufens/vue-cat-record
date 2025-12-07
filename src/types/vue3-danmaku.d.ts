// src/types/vue3-danmaku.d.ts
declare module 'vue3-danmaku' {
  import { DefineComponent } from 'vue'

  export interface DanmuItem {
    content: string
    color?: string
    [key: string]: unknown
  }

  interface DanmakuProps {
    danmus?: DanmuItem[]
    isSuspend?: boolean
    top?: number
    speeds?: number
    useSlot?: boolean
    loop?: boolean
    channels?: number
  }

  interface DanmakuMethods {
    play: () => void
    pause: () => void
    add: (danmu: DanmuItem) => void
    resize: () => void
    // 可以根据需要添加其他方法
  }

  const VueDanmaku: DefineComponent<
    DanmakuProps,
    Record<string, never>,
    unknown,
    Record<string, never>,
    DanmakuMethods
  >

  export default VueDanmaku
}
