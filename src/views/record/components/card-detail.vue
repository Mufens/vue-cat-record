<script setup lang="ts">
import type { MessageItem } from '@/components/cardList'
import { ref, watch, computed, nextTick } from 'vue'
import { ElInput } from 'element-plus'
import { useUserStore } from '@/stores/modules/user'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

const props = defineProps<{ item?: MessageItem; modelValue: boolean }>()
const emit = defineEmits(['update:modelValue', 'update:item'])
const visible = ref(false)
const currentImageIndex = ref(0)

const dialogHeight = computed(() => {
  if (!props.item?.ratio) return '380px'
  const [w, h] = props.item.ratio.split('/').map(Number)
  return w / h === 3 / 4 ? '500px' : w / h === 1 ? '400px' : `${Math.min(600, (400 * h) / w)}px`
})

const images = computed(() => {
  if (!props.item) return []
  return Array.isArray(props.item.pictures) ? props.item.pictures : [props.item.pictures]
})
const prevImage = () => {
  if (currentImageIndex.value > 0) currentImageIndex.value--
}
const nextImage = () => {
  if (currentImageIndex.value < images.value.length - 1) currentImageIndex.value++
}
watch(visible, newVal => {
  if (!newVal) currentImageIndex.value = 0
})

const totalComments = computed(() => {
  if (!props.item?.comment || props.item.comment.length === 0) return 0
  return props.item.comment.reduce((acc, comment) => {
    return acc + 1 + (comment.replies?.length || 0)
  }, 0)
})

const userStore = useUserStore()
const replyTarget = ref<{
  commentIndex?: number
  replyIndex?: number
  replyUser?: string
  replyContent?: string
  isReplyToReply?: boolean
} | null>(null)
const sendComment = () => {
  if (!commentInput.value.trim() || !props.item) return
  // 创建深拷贝确保响应式更新
  const updatedItem = JSON.parse(JSON.stringify(props.item))
  updatedItem.comment = updatedItem.comment ? [...updatedItem.comment] : []

  const newComment = {
    avatar: userStore.user?.avatar || '',
    user: userStore.user?.name || '匿名用户',
    content: commentInput.value.trim(),
    time: new Date().toISOString().split('T')[0] + ' '
  }
  if (replyTarget.value) {
    const updatedComments = [...(props.item.comment || [])]
    const targetComment = updatedComments[replyTarget.value.commentIndex!]
    if (targetComment) {
      // 根据回复类型生成内容
      const contentPrefix = replyTarget.value.isReplyToReply
        ? `回复 @${replyTarget.value.replyUser}：`
        : ''
      const newReply = {
        id: Date.now(),
        ...newComment,
        content: contentPrefix + commentInput.value.trim()
      }
      //添加到主评论的replies或子回复
      if (replyTarget.value.isReplyToReply) {
        targetComment.replies = [...(targetComment.replies || []), newReply]
      } else {
        targetComment.replies = [...(targetComment.replies || []), newReply]
      }
      emit('update:item', { ...props.item, comment: updatedComments })
    }
  } else {
    updatedItem.comment.unshift(newComment)
  }
  emit('update:item', updatedItem)
  commentInput.value = ''
  replyTarget.value = null
  showButtons.value = false
}
const showButtons = ref(false)
const handleInputFocus = () => {
  showButtons.value = true
}
const cancelComment = () => {
  commentInput.value = ''
  replyTarget.value = null
  showButtons.value = false
}
const commentInputRef = ref<InstanceType<typeof ElInput>>()
watch(
  () => props.modelValue,
  newVal => {
    visible.value = newVal // 同步父组件值到本地
  },
  {
    immediate: true
  }
)
watch(visible, newVal => {
  emit('update:modelValue', newVal)
  //同步本地值到父组件
})

const commentInput = ref('')
</script>
<template>
  <div>
    <el-dialog v-model="visible" :show-close="false" width="820" class="elDialog" draggable>
      <div class="dialog" v-if="props.item" :style="{ height: dialogHeight }">
        <div class="left">
          <div class="image-container">
            <img
              :src="images[currentImageIndex]"
              :style="{ aspectRatio: props.item.ratio || '1' }"
              class="preview-image"
            />
            <div class="change" v-if="images.length > 1">
              <div @click.stop="prevImage" class="change prev" v-show="currentImageIndex > 0">
                <el-icon><ArrowLeft /></el-icon>
              </div>
              <div
                @click.stop="nextImage"
                class="change next"
                v-show="currentImageIndex < images.length - 1"
              >
                <el-icon><ArrowRight /></el-icon>
              </div>
            </div>
          </div>
        </div>

        <div class="right">
          <div class="right-inner">
            <!-- 头部作者信息 -->
            <div class="header">
              <el-avatar :src="props.item.avatar" :size="45" />
              <span class="username">{{ props.item.author }}</span>
            </div>

            <!-- 文字区域 -->

            <div class="comments-container">
              <div class="content-container">
                <div class="title">{{ props.item.title }}</div>
                <div class="content">{{ props.item.content }}</div>
                <div class="time" v-if="props.item.time">{{ props.item.time }}</div>
              </div>
              <div class="comments-list">
                <template v-if="totalComments > 0">
                  <p class="judge">共{{ totalComments }}条评论</p>
                </template>
                <template v-else>
                  <div class="empty-comments">暂无评论，快来抢沙发~</div>
                </template>

                <div
                  v-for="(comment, index) in props.item.comment"
                  :key="comment.time + index"
                  class="comment-item"
                >
                  <div class="comment-header">
                    <div class="avatar"><el-avatar :src="comment.avatar" :size="38" /></div>
                    <div class="userinfo">
                      <span class="user">{{ comment.user }}</span>
                      <p class="comment-content">{{ comment.content }}</p>
                      <div class="huifu">
                        <div class="ctime">{{ comment.time }}</div>
                        <div
                          class="rp"
                          @click="
                            ;(replyTarget = {
                              commentIndex: index,
                              replyUser: comment.user,
                              replyContent: comment.content,
                              isReplyToReply: false
                            }),
                              nextTick(() => commentInputRef?.focus())
                          "
                        >
                          回复
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- 回复 -->
                  <div v-for="(reply, rIndex) in comment.replies" :key="rIndex" class="reply-item">
                    <el-avatar :src="reply.avatar" :size="26" />
                    <div class="reply-content">
                      <span class="replyUser">{{ reply.user }}</span>
                      <p class="rc">{{ reply.content }}</p>
                      <div class="huifu">
                        <div class="ctime">{{ reply.time }}</div>
                        <div
                          class="rp"
                          @click="
                            ;(replyTarget = {
                              commentIndex: index,
                              replyUser: reply.user,
                              replyContent: reply.content,
                              isReplyToReply: true
                            }),
                              nextTick(() => commentInputRef?.focus())
                          "
                        >
                          回复
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 输入框 -->
            <div class="comment-input">
              <div class="reply-prompt" v-if="replyTarget">
                <template v-if="replyTarget.isReplyToReply">
                  回复<span class="reply-user">@{{ replyTarget.replyUser }}</span>
                  <div class="reply-content">{{ replyTarget.replyContent }}</div>
                </template>
                <template v-else>
                  回复 <span class="reply-user">@{{ replyTarget.replyUser }}</span>

                  <div class="reply-content">{{ replyTarget.replyContent }}</div>
                </template>
              </div>
              <div class="custom-input-wrapper">
                <el-input
                  class="custom-input"
                  ref="commentInputRef"
                  @focus="handleInputFocus"
                  v-model="commentInput"
                  placeholder="说点什么..."
                  @keyup.enter="sendComment"
                  @blur="!commentInput.trim() && (showButtons = false)"
                >
                </el-input>
                <div class="button-group" v-if="showButtons || commentInput.trim()">
                  <el-button @click="cancelComment"> 取消 </el-button>
                  <el-button
                    class="send-btn"
                    type="primary"
                    @click="sendComment"
                    :disabled="!commentInput.trim()"
                  >
                    {{ replyTarget ? '回复' : '发送' }}
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.el-dialog__header {
  display: none;
}
:deep(.elDialog) {
  border-radius: 20px;
  padding: 0;
}
.dialog {
  display: flex;
}
.left {
  position: relative;
  flex: 1;
  min-width: 420px;
  margin-top: -16px;
  padding-right: 20px;
  .image-container {
    position: relative;
    height: 100%;
    width: 100%;

    &:hover .change {
      opacity: 1;
    }
  }
}
.preview-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  border-radius: 20px 0 0 20px;
}
.change {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 10px;
  z-index: 2;
  width: 100%;
  justify-content: space-between;

  .prev,
  .next {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    &:hover {
      background: rgba(255, 255, 255, 1);
    }
    .el-icon {
      font-size: 16px;
      color: #666;
    }
  }
  .prev {
    left: 15px;
  }
  .next {
    right: 15px;
  }
  opacity: 0;
  transition: opacity 0.3s;
}

.right {
  flex: 1;
  min-width: 300px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
}
.right-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 16px;
}
.username {
  font-size: 18px;
  color: #858585;
}
.user {
  font-size: 15px;
  color: #858585;
}
.replyUser {
  font-size: 14px;
  color: #858585;
}
.comments-container {
  flex: 1;
  overflow-y: auto;
  border-bottom: 1px solid var(--border-line-color);
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.content-container {
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-line-color);
}
::-webkit-scrollbar {
  display: none;
}

.title {
  font-weight: bold;
  font-size: 18px;
  color: var(--message-panel-text);
  margin-bottom: 8px;
}
.content {
  font-size: 16px;
  margin-bottom: 8px;
  color: var(--message-panel-text);
}
.comment-content {
  color: var(--message-panel-text);
  font-size: 15px;
  padding: 5px 0;
}
.rc {
  color: var(--message-panel-text);
  font-size: 15px;
  padding: 5px 0;
}
.time {
  font-size: 14px;
  color: #858585;
  padding-top: 8px;
}
.huifu {
  display: flex;
  width: 100px;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  line-height: 1.5;
  color: #858585;
}

.ctime {
  flex: 1;
  font-size: 13px;
  color: #858585;
}
.rp {
  cursor: pointer;
  &:hover {
    color: var(--menu-active-text-color);
  }
}
.judge {
  font-size: 15px;
  color: #858585;
  padding: 12px 0;
}
.comment-item {
  padding-bottom: 12px;
}
.comment-header {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 8px;
}
.user {
  font-size: 16px;
}

.reply-item {
  display: flex;
  gap: 8px;
  margin-top: 8px;
  padding-left: 45px;
}
.comment-input {
  border-top: 1px solid var(--border-line-color);
}
.reply-prompt {
  padding: 8px 0;
  font-size: 14px;
  color: #666;
  .reply-user {
    color: var(--menu-active-text-color);
    font-weight: 500;
  }
  .reply-content {
    color: #858585;
  }
}
.empty-comments {
  color: #999;
  text-align: center;
  padding: 20px;
  font-size: 14px;
}
:deep(.custom-input .el-input__wrapper) {
  margin: 5px 0;
  border-radius: 20px;
}
.button-group {
  display: flex;
  justify-content: flex-end;
}

.el-button {
  border-radius: 20px;
  margin-left: 2px;
  margin-bottom: 5px;
}
</style>
