<template>
  <div>
    <!-- 触发弹窗的按钮 -->
    <button @click="showModal" style="background-color: #4CAF50; /* Green */
      border: none;
      color: white;
      padding: 10px 24px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
      border-radius: 5px;">微信二维码</button>

    <!-- 微信二维码模态框 -->
    <div v-if="isVisible" class="wechat-modal" @click.self="hideModal">
      <!-- 模态框内容 -->
      <div class="wechat-modal-content">
        <span class="close" @click="hideModal">&times;</span>
        <p>我的微信二维码</p>
        <img src="/wechat.jpg" alt="微信二维码" style="max-width: 100%; height: auto;">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false
    };
  },
  methods: {
    showModal() {
      this.isVisible = true;
    },
    hideModal() {
      this.isVisible = false;
    }
  }
};
</script>

<style>
/* 模态框背景 */
.wechat-modal {
  display: flex; /* 使用flexbox居中 */
  justify-content: center;
  align-items: center;
  position: fixed; /* 固定位置 */
  z-index: 1; /* 放在顶部 */
  left: 0;
  top: 0;
  width: 100%; /* 全屏 */
  height: 100%; /* 全屏 */
  overflow: auto; /* 如果需要可以滚动 */
  background-color: rgba(0,0,0,0.4); /* 半透明黑色背景 */
}

/* 模态框内容 */
.wechat-modal-content {
  background-color: #fefefe;
  margin: auto; /* flexbox和auto margin可以居中 */
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 300px; /* 最大宽度 */
  text-align: center;
  position: relative;
  border-radius: 10px; /* 圆角 */
}

/* 关闭按钮 */
.wechat-modal-content .close {
  color: #aaa;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.wechat-modal-content .close:hover,
.wechat-modal-content .close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style> 