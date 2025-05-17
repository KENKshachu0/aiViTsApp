<template>
  <view class="container">
    <text class="title">欢迎使用语音助手</text>
    <button @click="goToASR">启动语音识别</button>
  </view>
</template>

<script>
export default {
  methods: {
    goToASR() {
      uni.navigateTo({
        url: '/pages/asr/index'
      })
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100rpx;
}
.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 50rpx;
}
button {
  font-size: 18px;
  padding: 20rpx 40rpx;
}
</style>