<script setup lang="ts">
import { View } from '@element-plus/icons-vue'
import { ref, onMounted, nextTick, watch, reactive } from 'vue'
import type { MessageItem } from '@/components/cardList'
import { messageList } from '@/components/cardList'
import CardDetail from './card-detail.vue'

const columns = ref<MessageItem[][]>([])
const containerRef = ref<HTMLElement>()
const columnCount = ref(3)
const isVisible = ref(false)
const visible = ref(false)
const selectedItem = ref<MessageItem>({
  id: 0,
  pictures: [],
  content: '',
  avatar: '',
  author: '',
  view: '',
  ratio: '1'
})
const handleCardClick = (item: MessageItem) => {
  selectedItem.value = item
  visible.value = true
}
// 计算布局
const calculateLayout = async () => {
  if (!containerRef.value) return
  isVisible.value = false

  const containerWidth = containerRef.value.offsetWidth
  const minColumnWidth = 240
  const gap = 16

  // 修正列数计算公式
  columnCount.value = Math.max(1, Math.floor((containerWidth + gap) / (minColumnWidth + gap)))

  const tempColumns: MessageItem[][] = Array.from({ length: columnCount.value }, () => [])

  await nextTick()

  // 等待图片加载完成
  const images = Array.from(containerRef.value.querySelectorAll('img'))
  await Promise.all(
    images.map(img =>
      img.complete
        ? Promise.resolve()
        : new Promise(resolve => {
            img.addEventListener('load', resolve)
            img.addEventListener('error', resolve)
          })
    )
  )

  const allItems = Array.from(containerRef.value.querySelectorAll('.waterfall-item'))
  const heightMap = new Map()
  allItems.forEach(item => {
    const element = item as HTMLElement
    heightMap.set(element.dataset.id, element.clientHeight)
  })

  const columnHeights = new Array(columnCount.value).fill(0)
  messageList.forEach((item, index) => {
    const targetCol = columnHeights.indexOf(Math.min(...columnHeights))
    const itemHeight = heightMap.get(index.toString()) || 0

    columnHeights[targetCol] += itemHeight + gap
    tempColumns[targetCol].push({ ...item, originalIndex: index }) // 存储原始索引
  })

  columns.value = tempColumns
  isVisible.value = true
}
const handleItemUpdate = (updatedItem: MessageItem) => {
  const index = messageList.findIndex(item => item.id === updatedItem.id)
  if (index !== -1) {
    messageList.splice(index, 1, reactive(updatedItem))
  }
}

// 初始化及响应式处理
onMounted(() => {
  let resizeTimer: ReturnType<typeof setTimeout>
  const observer = new ResizeObserver(() => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(calculateLayout, 200)
  })
  if (containerRef.value) observer.observe(containerRef.value)
  calculateLayout()
  return () => observer.disconnect()
})

watch(
  () => [...messageList],
  () => nextTick(calculateLayout),
  { deep: true }
)
</script>

<template>
  <div ref="containerRef" class="waterfall-container" :style="{ opacity: isVisible ? 1 : 0 }">
    <template v-if="isVisible">
      <div v-for="(col, colIndex) in columns" :key="colIndex" class="waterfall-column">
        <el-card
          v-for="(item, itemIndex) in col"
          :key="itemIndex"
          @click="handleCardClick(item)"
          class="waterfall-item"
          :data-id="item.originalIndex"
          :body-style="{ padding: '0px' }"
          shadow="hover"
        >
          <!-- 保持与实际一致的内容结构 -->
          <div class="image-box" :style="{ aspectRatio: item.ratio || '1' }">
            <img
              :src="Array.isArray(item.pictures) ? item.pictures[0] : item.pictures"
              class="cover-image"
            />
          </div>
          <div class="content-box">
            <div class="content-text">{{ item.title }}</div>
            <div class="meta-info">
              <div class="user-info">
                <el-avatar :src="item.avatar" :size="24" />
                <span class="username">{{ item.author }}</span>
              </div>
              <div class="view-count">
                <el-icon><View /></el-icon>
                {{ item.view }}
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <card-detail
        v-model="visible"
        :item="selectedItem || {}"
        v-if="selectedItem"
        @update:item="handleItemUpdate"
      />
    </template>

    <!-- 修正隐藏渲染结构 -->
    <div v-if="!isVisible" class="hidden-render">
      <el-card
        v-for="(item, index) in messageList"
        :key="index"
        class="waterfall-item"
        :data-id="index"
        :body-style="{ padding: '0px' }"
        shadow="hover"
      >
        <div class="image-box" :style="{ aspectRatio: item.ratio || '1' }">
          <img
            :src="Array.isArray(item.pictures) ? item.pictures[0] : item.pictures"
            class="cover-image"
          />
        </div>
        <div class="content-box">
          <div class="content-text">{{ item.title }}</div>
          <div class="meta-info">
            <div class="user-info">
              <el-avatar :src="item.avatar" :size="24" />
              <span class="username">{{ item.author }}</span>
            </div>
            <div class="view-count">
              <el-icon><View /></el-icon>
              {{ item.view }}
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.waterfall-container {
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  .waterfall-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 240px;
    .waterfall-item {
      margin-bottom: 0px;
      border-radius: 12px 12px 0 0;
      transition: transform 0.2s;
      &:hover {
        transform: translateY(-4px);
      }

      .image-box {
        position: relative;
        cursor: pointer;
        width: 100%;
        overflow: hidden;
        .cover-image {
          width: 100%;
          height: 100%;
          background-size: cover;
          border-radius: 8px;
        }
      }

      .content-box {
        padding: 12px;
        .content-text {
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 12px;
          word-break: break-word;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .meta-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--span-color);

          .user-info {
            display: flex;
            align-items: center;
            gap: 8px;

            .username {
              font-size: 13px;
              font-weight: 500;
            }
          }

          .view-count {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 12px;

            .el-icon {
              margin-right: 2px;
            }
          }
        }
      }
    }
  }
}
</style>
