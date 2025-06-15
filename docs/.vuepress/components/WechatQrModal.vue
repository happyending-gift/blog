<template>
  <div style="border: 2px solid red; padding: 20px;">
    <button @click="showModal">测试按钮（必须可见）</button>
    <div v-if="isVisible">测试弹窗内容</div>
  </div>
</template>

<script>
export default {
  data() {
    return { isVisible: false };
  },
  methods: {
    showModal() { this.isVisible = true; }
  }
};
</script>