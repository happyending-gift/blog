<template>
  <a href="weixin://" data-path="添加好友" :data-username="wechatId">
    添加我的微信
  </a>
</template>

<script>
export default {
  props: {
    wechatId: {
      type: String,
      required: true
    }
  }
}
</script>