<template>
  <div class="message-form">
    <div class="message-form__title">留言墙</div>
    <div class="message-form__content">
      <input
        type="text"
        id="bubble_txt"
        max="25"
        autocomplete="off"
        placeholder="留下点什么吧，最多25个字～"
        data-v-21971730
      />
      <button type="button" id="bubble_btn" data-v-21971730>发射</button><br />
    </div>
    <div class="control">
      <button type="button" id="bubble_btn" data-v-21971730>暂停</button>
      <button type="button" id="bubble_btn" data-v-21971730>继续</button>
      <button type="button" id="bubble_btn" data-v-21971730>加速</button>
      <button type="button" id="bubble_btn" data-v-21971730>减速</button>
      <button type="button" id="bubble_btn" data-v-21971730>隐藏</button>
      <button type="button" id="bubble_btn" data-v-21971730>显示</button>
    </div>
  </div>
  <div class="baberrage">
    <vue-danmaku
      class="danmaku"
      ref="danmaku"
      :isSuspend="true"
      :top="20"
      useSlot
      loop
      :channels="12"
    >
      <template v-slot:dm="{ danmu }">
        <div class="danmaku-name">
          <span class="bullet-item">
            <img src="" alt="" />
            {{ danmu.commentContent }}</span
          >
        </div>
      </template>
    </vue-danmaku>
  </div>
  <div class="success-box">
    <img src="" alt="" />
    <span>发布成功</span>
  </div>
</template>

<style scoped>
.baberrage {
  padding-top: 300px;
  width: 100%;
  height: 70vh;
  overflow: hidden;

  background-size: 100%;
}

.danmaku {
  width: 100%;
  height: 100%;
}

.control {
  margin-top: 20px;
}
.control > button {
  margin-right: 12px;
}
.control > button:hover {
  background-color: #e73c7e;
  border: 1px solid #fff;
  color: #fff;
  cursor: pointer;
  animation: rightToleft 9s linear both;
}
.bullet-item {
  white-space: nowrap;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 30px;
  height: 30px;
  font-size: 16px;
  color: #ffffff;
  line-height: 30px;
  padding-right: 20px;
  display: flex;
}

img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.success-box {
  width: 120px;
  height: 40px;
  border-radius: 8px;
  background: #f0f9eb;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  position: absolute;
  top: 10%;
  left: 50%;
  margin-left: -65px;
  margin-top: -65px;
  color: #67c23a;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
}

.success-box > img {
  display: inline-block;
  width: 20px;
  height: 20px;
}
</style>
