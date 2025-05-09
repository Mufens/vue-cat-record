<script setup lang="ts">
import DatePunch from '@/components/calendar/date-punch.vue'
import CarouselItem from './components/carousel-item.vue'
import CardList from './components/card-list.vue'
</script>
<template>
  <div class="cat-record">
    <el-row>
      <el-col :span="17">
        <CardList />
      </el-col>
      <el-col :span="7" class="right-side">
        <div class="todoList">
          <el-card shadow="never">
            <div class="summary">
              <div class="all">
                <div class="a">参与天数</div>
                <span>99</span>
              </div>
              <div class="submit">
                <div class="a">记录数</div>
                <span>11</span>
              </div>
              <div class="contribution">
                <div class="a">贡献等级</div>
                <span><i class="iconfont icon-tubiao_jingxiaoshangdengji"></i></span>
              </div>
            </div>
          </el-card>
          <div class="stickey">
            <DatePunch />
            <CarouselItem />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss">
.el-card {
  margin: 10px 5px;
}
.cat-record {
  min-width: 800px;
  .right-side {
    .todoList {
      position: sticky;
      top: 20px;
      margin-bottom: 10px;
      .summary {
        display: flex;
        .all,
        .submit,
        .contribution {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .a {
            margin-bottom: 5px;
            font-size: 14px;
            color: var(--span-color);
          }
          span {
            font-family: 'Yahei';
            font-size: 25px;
            .iconfont {
              font-size: 32px;
              color: var(--text-color-primary);
            }
          }
        }
      }
    }
  }
}
</style>
