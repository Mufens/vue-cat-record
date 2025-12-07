<template>
  <div class="board">
    <div class="message-form">
      <div class="message-form__content">
        <input
          ref="inputRef"
          type="text"
          v-model="message"
          maxlength="25"
          autocomplete="off"
          placeholder="留下点什么吧，最多25个字～"
          @keyup.enter="sendDanmu"
        />
        <el-button type="primary" @click="sendDanmu" :disabled="!message.trim()">发射</el-button>
      </div>
      <div class="control">
        <div class="control">
          <el-button type="primary" @click="togglePause">{{
            isPaused ? '继续' : '暂停'
          }}</el-button>
          <el-button type="primary" @click="increaseSpeed" :disabled="speed >= maxSpeed"
            >加速</el-button
          >
          <el-button type="primary" @click="decreaseSpeed" :disabled="speed <= minSpeed"
            >减速</el-button
          >
          <el-button type="primary" @click="toggleVisibility">{{
            isVisible ? '隐藏' : '显示'
          }}</el-button>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="baberrage" v-show="isVisible" ref="baberrageRef">
        <vue-danmaku
          :key="forceUpdateKey"
          ref="danmakuRef"
          :danmus="danmuList"
          class="danmaku"
          :isSuspend="true"
          :top="20"
          :speeds="speed"
          use-slot
          loop
          :channels="12"
        >
          <template v-slot:dm="{ danmu }">
            <div class="danmaku-name">
              <span class="bullet-item" :style="{ color: danmu.color }">
                {{ danmu.content }}
              </span>
            </div>
          </template>
        </vue-danmaku>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import VueDanmaku from 'vue3-danmaku'
interface Danmu {
  content: string
  color: string
}

const baberrageRef = ref<HTMLElement | null>(null)
let observer: ResizeObserver | null = null

onMounted(() => {
  if (baberrageRef.value) {
    observer = new ResizeObserver(() => {
      setTimeout(() => danmakuRef.value?.resize(), 10)
    })
    observer.observe(baberrageRef.value)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
const forceUpdateKey = ref(0)

interface Danmu {
  content: string
  color: string
}
const danmuList = ref<Danmu[]>([
  { content: '欢迎来到留言板！', color: '#e73c7e' },
  { content: '试试发送一条弹幕吧～', color: '#23a6d5' },
  { content: '弹幕速度可以调节哦！', color: '#23d5ab' },
  { content: '你也可以使用不同的颜色！', color: '#ee7752' },
  { content: '祝你玩得开心！', color: '#e73c7e' },
  { content: '我爱猫猫', color: '#23a6d5' }
])
// 弹幕控制相关
const danmakuRef = ref<InstanceType<typeof VueDanmaku>>()
const inputRef = ref<HTMLInputElement | null>(null)
const message = ref('')
const isPaused = ref(false)
const isVisible = ref(true)
const speed = ref(180)
const minSpeed = 1
const maxSpeed = 250

// 添加速度控制方法
const increaseSpeed = () => {
  speed.value = Math.min(speed.value + 20, maxSpeed)
}
const decreaseSpeed = () => {
  speed.value = Math.max(speed.value - 20, minSpeed)
}

const colors = ['#e73c7e', '#23a6d5', '#23d5ab', '#ee7752', '#FCD337', 'C1651A']

const lastDanmu = reactive({
  content: '',
  time: 0
})

// 发送弹幕
const sendDanmu = () => {
  const content = message.value.trim().slice(0, 25)

  const now = Date.now()

  const newDanmu: Danmu = {
    content: escapeHtml(content),
    color: colors[Math.floor(Math.random() * colors.length)]
  }
  danmuList.value.push(newDanmu)
  danmakuRef.value?.add({ content: newDanmu.content, color: newDanmu.color })
  message.value = ''
  inputRef.value?.focus()
  lastDanmu.content = content
  lastDanmu.time = now
}

// HTML特殊字符转义
const escapeHtml = (unsafe: string) => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// 控制方法
const togglePause = () => {
  if (isPaused.value) {
    danmakuRef.value?.play()
  } else {
    danmakuRef.value?.pause()
  }
  isPaused.value = !isPaused.value
}

const toggleVisibility = () => {
  isVisible.value = !isVisible.value
}
</script>

<style scoped>
.board {
  position: relative;
  margin: 10px;
  height: 500px;

  background: url('@/assets/images/bg3.png') no-repeat center;
  background-size: 100% 100%;
}
.message-form {
  display: flex;
  padding-top: 10px;
  text-align: center;
  flex-direction: column;
  align-items: center;
}
.control {
  display: flex;
  padding-top: 10px;
  margin-left: -30px;
  gap: 10px;
}

input {
  padding: 8px 12px;
  border: 1px solid transparent;
  border-radius: 20px;
  margin-right: 10px;
  width: 300px;
  background-color: rgba(255, 255, 255, 0.5);
}

input:focus {
  outline: none;
  border: 1px solid var(--menu-active-text-color);
}

.el-button {
  border: none;
  border-radius: 20px;
}

.bullet-item {
  font-size: 16px;
  padding: 4px 12px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: inline-block;
  margin: 2px 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.baberrage {
  position: relative;
  top: 20px;
  height: 350px;
}

.danmaku {
  height: 100%;
  width: 100%;
  --danmaku-paused: paused;
}
.danmaku[data-suspended='true'] {
  --danmaku-paused: paused;
}
</style>
