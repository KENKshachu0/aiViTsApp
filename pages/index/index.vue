<template>
  <view class="container">
    <text class="title">语音助手</text>
    <button @click="goToASR">启动语音识别</button>
    <button @click="goToChat">进入语音聊天</button>
  </view>
</template>

<script>
export default {
  methods: {
    goToASR() {
      uni.navigateTo({
        url: '/pages/asr/index'
      })
    },
    goToChat() {
      uni.navigateTo({
        url: '/pages/chat/index'
      })
    }
  }
}
</script>