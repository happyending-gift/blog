<template>
  <div>
    <!-- 触发按钮 -->
    <button @click="showModal" class="wechat-btn">
      微信二维码
    </button>

    <!-- 模态框使用v-show保持DOM稳定 -->
    <div v-show="isVisible" class="wechat-modal" @click.self="hideModal">
      <div class="wechat-modal-content">
        <span class="close" @click="hideModal">&times;</span>
        <p>我的微信二维码</p>
        <img
            src="/wechat.jpg"
            alt="微信二维码"
            class="qrcode-img"
            @error="handleImageError"
        >
        <p v-if="imageFailed" class="error-text">图片加载失败，请刷新重试</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
      imageFailed: false
    }
  },
  methods: {
    showModal() {
      this.isVisible = true
    },
    hideModal() {
      this.isVisible = false
    },
    handleImageError() {
      this.imageFailed = true
    }
  }
}
</script>

<style scoped>
.wechat-btn {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}
.wechat-btn:hover {
  background-color: #45a049;
}

.wechat-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
}

.wechat-modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 300px;
  text-align: center;
  position: relative;
  border-radius: 10px;
  animation: modalopen 0.3s;
}

@keyframes modalopen {
  from { opacity: 0; transform: scale(0.9) }
  to { opacity: 1; transform: scale(1) }
}

.close {
  color: #aaa;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}
.close:hover {
  color: black;
}

.qrcode-img {
  max-width: 100%;
  height: auto;
  border: 1px solid #ddd;
  margin-top: 10px;
}

.error-text {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}
</style>