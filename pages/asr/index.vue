<template>
  <view class="container">
    <button @click="startASR">🎤 开始语音识别</button>
    <view class="result">识别结果：{{ result }}</view>
  </view>
</template>

<script>
import AliASR from '@/utils/nls.js'

export default {
  data() {
    return {
      result: '',
      asr: null,
    }
  },
  methods: {
    startASR() {
      const appkey = '2BBIDJhM2wHRBQIl'// aliyun appkey    STATIC!!!
      const token = 'a5ef6be6b8424265bf8b746917c327c3' //aliyun token

      this.result = ''
      this.asr = new AliASR({
        appkey,
        token,
        onResult: (res) => {
          this.result = res
          console.log("识别结果：", res)
        }
      })
      this.asr.start()
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100rpx;
}
.result {
  margin-top: 40rpx;
  font-size: 20px;
  color: #333;
  text-align: center;
}
</style>