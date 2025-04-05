<script setup lang="ts" name="404"></script>
<template>
  <div class="erro-page">
    <div class="error-box">
      <img src="../../assets/images/404error.svg" alt="" />
      <div class="error-desc">啊哦~ 你所访问的页面不存在</div>

      <div class="error-handle">
        <router-link to="/">
          <el-button type="primary" size="large">返回首页</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.erro-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;

  .error-box {
    width: 400px;
    img {
      margin-top: -200px;
      height: 400px;
      width: 100%;
    }
    .error-desc {
      margin-top: -50px;
      font-size: 25px;
      color: #777;
      text-align: center;
    }

    .error-handle {
      margin-top: 20px;
      text-align: center;
    }
  }
}
.el-button--primary {
  background-color: var(--menu-active-text-color) !important;
  border-color: var(--button-color) !important;
  color: #fff !important;
  &:hover {
    border-color: var(--menu-active-text-color) !important;
  }
}
</style>
