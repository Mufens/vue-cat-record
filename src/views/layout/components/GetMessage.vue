[file name]: GetMessage.vue [file content begin]
<script setup lang="ts">
import { ElTabs, ElTabPane, ElBadge } from 'element-plus'
import { ref, onMounted, onUnmounted } from 'vue'

const dialogVisible = ref(false)
const panelRef = ref<HTMLElement | null>(null)
const iconRef = ref<HTMLElement | null>(null)
const isdot = ref(true) //初始有未读消息
const messagesRead = ref(false)
const notificationsRead = ref(false)
const todosRead = ref(false)

const handleClickOutside = (event: MouseEvent) => {
  if (
    dialogVisible.value &&
    panelRef.value &&
    !panelRef.value.contains(event.target as Node) &&
    !iconRef.value?.contains(event.target as Node)
  ) {
    dialogVisible.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 消息数据
import avatar4 from '@/assets/images/avatar4.jpg'
import avatar2 from '@/assets/images/avatar2.jpg'
import avatar3 from '@/assets/images/avatar3.jpg'

const messageData = {
  messages: [
    {
      user: '豚鼠',
      content: '早上好，这是今天的工作安排：中午十二点去E教诱捕让大宝乖乖的去医院',
      time: '今天8:57:06',
      avatar: avatar4
    },
    {
      user: '豚鼠',
      content: '今天的工作辛苦了><',
      time: '昨天22:33:59',
      avatar: avatar4
    },
    {
      user: 'xxbb 的回复',
      content: '绝育安排到周六',
      time: '昨天12:30:01',
      avatar: avatar2
    },
    {
      user: '潇洒 的评论',
      content: '怎么会有这么可爱的小猫咪,没有小猫咪世界都不能转,就让我狠狠rua一下吧(暴风吸入)',
      time: '昨天 12:20:01',
      avatar: avatar3
    }
  ],
  notifications: [
    { title: '系统维护通知', content: '本周六凌晨进行系统升级维护', time: '今天 09:00:00' },
    { title: '权限变更通知', content: '您的账号权限已更新', time: '昨天 18:30:00' }
  ],
  todos: [{ task: '报销审批', status: '待处理', time: '今天 10:00:00' }]
}
const markAllAsRead = () => {
  isdot.value = false
  messagesRead.value = true
  notificationsRead.value = true
  todosRead.value = true
  dialogVisible.value = false
}
</script>

<template>
  <div class="message-container">
    <div class="message-icon" ref="iconRef" @click.stop="dialogVisible = !dialogVisible">
      <!-- 修改此处：根据 isdot 条件渲染 Badge -->
      <template v-if="isdot">
        <el-badge :is-dot="true" :offset="[-5, 1]">
          <i class="iconfont icon-xiaoxi1"></i>
        </el-badge>
      </template>
      <template v-else>
        <i class="iconfont icon-xiaoxi1"></i>
      </template>
    </div>

    <div class="message-panel" ref="panelRef" v-show="dialogVisible" @click.stop>
      <!-- 标签页区域 -->
      <el-tabs type="card" class="message-tabs">
        <el-tab-pane :label="messagesRead ? '消息' : `消息(${messageData.messages.length})`">
          <div class="message-list">
            <div v-for="(msg, index) in messageData.messages" :key="index" class="message-item">
              <div class="avater">
                <el-avatar :src="msg.avatar" :size="35" />
              </div>

              <div class="userinfo">
                <div class="user">{{ msg.user }}</div>
                <div class="content">{{ msg.content }}</div>
                <div class="time">{{ msg.time }}</div>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane
          :label="notificationsRead ? '通知' : `通知(${messageData.notifications.length})`"
        >
          <div class="message-list">
            <div
              v-for="(noti, index) in messageData.notifications"
              :key="index"
              class="message-item"
            >
              <div class="notinfo">
                <div class="title">【{{ noti.title }}】</div>
                <div class="content">{{ noti.content }}</div>
                <div class="time">{{ noti.time }}</div>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="todosRead ? '待办' : `待办(${messageData.todos.length})`">
          <div class="message-list">
            <div v-for="(todo, index) in messageData.todos" :key="index" class="message-item">
              <div class="task">{{ todo.task }}</div>
              <div class="status">{{ todo.status }}</div>
              <div class="time">{{ todo.time }}</div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>

      <!-- 底部操作栏 -->
      <div class="panel-footer">
        <div class="read" @click="markAllAsRead">全部已读</div>
        <div class="more">查看更多</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.message-container {
  position: relative;
  margin: 0 15px;

  .message-icon {
    cursor: pointer;
    i {
      font-size: 20px;
      color: var(--text-color-primary);
    }
  }

  .message-panel {
    position: absolute;
    width: 250px;
    max-height: 350px;
    top: 35px;
    right: -35px;
    border: 0.1px solid var(--border-color, #fff);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background: var(--message-panel-bg, #fff);
    color: var(--message-panel-text, #020817);

    padding: 16px;
    z-index: 9999;

    .message-tabs {
      :deep(.el-tabs__header) {
        margin: 0 0 12px;
        .el-tabs__item {
          padding: 0 16px;
          font-size: 13px;
          height: 32px;
        }
      }
    }

    .message-list {
      cursor: pointer;

      max-height: 250px;
      overflow-y: auto;

      .message-item {
        display: flex;
        align-items: flex-start;
        padding: 12px 0;
        border-bottom: 1px solid var(--border-line-color);
        .avater {
          margin-right: 12px;
          flex-shrink: 0;
        }
        .userinfo {
          flex: 1;
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .notinfo {
          display: flex;
          flex-direction: column;
          width: 100%;
          .title {
            text-align: left;
          }
          .content {
            padding-left: 7px;
            text-align: left;
          }
          .time {
            padding-left: 7px;
            text-align: left;
          }
        }
        &:last-child {
          border-bottom: none;
        }
        .content {
          margin: 4px 0;
          line-height: 1.4;
          word-break: break-word;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .user,
        .title,
        .task {
          font-size: 15px;
          color: var(--message-panel-text, #020817);

          margin-bottom: 4px;
        }
        .status {
          font-size: 12px;
          color: #f5f5f5;
          width: 50px;
          height: 20px;

          margin: 0 33px;
          border-radius: 2px;
          background-color: #ebba57;
        }
        .content {
          font-size: 12px;
          color: #99a3b3;
        }
        .time {
          font-size: 11px;
          color: #99a3b3;

          margin-top: 4px;
        }
      }
    }

    .panel-footer {
      display: flex;
      justify-content: space-between;
      padding-top: 12px;
      margin-top: 12px;
      border-top: 1px solid var(--border-color, #e2e8f0);
      .more,
      .read {
        cursor: pointer;
        font-size: 12px;
        padding: 0 8px;
        color: var(--text-color-primary);
        &:hover {
          color: var(--menu-active-text-color);
        }
      }
    }
  }
}
</style>
