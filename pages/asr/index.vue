<template>
  <view class="container">
    <button @click="startASR">🎤 开始语音识别</button>
    <button @click="stopASR">⏹️ 停止</button>
    <view class="result">识别结果：{{ result }}</view>
  </view>
</template>

<script>
import NLSClient from '@/utils/nls.js'

export default {
  data() {
    return {
      result: '',
      nls: null,
      recorder: null
    }
  },
  methods: {
    startASR() {
      this.nls = new NLSClient({
        appkey: '2BBIDJhM2wHRBQIl', //static！！！
        token: 'b76f0ff2634b458a9d1580fa4fd5bef0',
        onMessage: (msg) => {
          if (msg.result && msg.result.text) {
            this.result += msg.result.text
          }
        },
        onOpen: () => {
          console.log('WebSocket已连接')
          this.startRecorder()
        },
        onError: (err) => {
          console.error('WebSocket出错', err)
        },
        onClose: () => {
          console.log('连接已关闭')
        }
      })
      this.result = ''
      this.nls.connect()
    },
    stopASR() {
      this.stopRecorder()
      this.nls && this.nls.stop()
    },
    startRecorder() {
      const recorder = uni.getRecorderManager()
      this.recorder = recorder
      recorder.onFrameRecorded((res) => {
        // 每次录音帧（默认为 20ms）发送给阿里云识别服务
        this.nls.send(res.frameBuffer)
      })
      recorder.onStart(() => {
        console.log('录音开始')
      })
      recorder.onError((err) => {
        console.error('录音错误', err)
      })
      recorder.start({
        format: 'pcm',
        sampleRate: 16000,
        numberOfChannels: 1,
        encodeBitRate: 256000,
        frameSize: 1 // 单位 KB，表示每帧大小
      })
    },
    stopRecorder() {
      if (this.recorder) {
        this.recorder.stop()
        this.recorder = null
      }
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