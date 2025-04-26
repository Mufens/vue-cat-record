<script setup lang="ts">
import { ref } from 'vue'
const getImageUrl = (name: string) => {
  return new URL(`/src/assets/images/carousel/${name}`, import.meta.url).href
}

const prefecture = ref([
  { text: '救助专区', bg: 'carousel1.jpg' },
  { text: '猫咪相册', bg: 'carousel2.jpg' },
  { text: '领养专区', bg: 'carousel3.jpg' },
  { text: '活动专区', bg: 'carousel4.jpg' },
  { text: '猫咪日记', bg: 'carousel5.jpg' }
])
</script>

<template>
  <el-card :body-style="{ padding: '0px' }">
    <el-carousel :interval="4000" height="150px">
      <el-carousel-item
        v-for="item in prefecture"
        :key="item.text"
        :style="{ backgroundImage: `url(${getImageUrl(item.bg)})` }"
        class="custom-carousel-item"
      >
        <div class="content">
          {{ item.text }}
        </div>
      </el-carousel-item>
    </el-carousel>
  </el-card>
</template>

<style lang="scss" scoped>
.custom-carousel-item {
  cursor: pointer;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
}

.content {
  margin-left: 22px;
  color: #fff;
  font-size: 32px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.597);
  transform: scale(1.2);
}

.custom-carousel-item:hover::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.178);
}
::v-deep .el-carousel__indicators--horizontal {
  .el-carousel__indicator--horizontal button {
    width: 6px;
    height: 6px;
    background: #ffffff;
    border-radius: 50%;
    opacity: 0.5;
  }
  .el-carousel__indicator--horizontal.is-active button {
    width: 14px;
    height: 6px;
    background: #ffffff;
    opacity: 1;
    border-radius: 10px;
  }
}
</style>
