<template>
  <view class="container">
    <button @click="startRecognize">开始本地语音识别</button>
    <view class="result">识别结果：{{ result }}</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      result: ''
    }
  },<template>
  <view class="chat-container">
    <scroll-view scroll-y class="messages">
      <view v-for="(msg, index) in messages" :key="index" class="message">
        <text>{{ msg }}</text>
      </view>
    </scroll-view>
    <view class="input-area">
      <input v-model="inputText" placeholder="输入内容..." class="text-input"/>
      <button @click="sendText">发送</button>
      <button @click="startVoiceInput">🎤</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      inputText: '',
      messages: []
    }
  },
  methods: {
    sendText() {
      if (this.inputText.trim()) {
        this.messages.push(this.inputText)
        this.inputText = ''
      }
    },
    startVoiceInput() {
      const main = plus.android.runtimeMainActivity()
      const SpeechRecognizer = plus.android.importClass('android.speech.SpeechRecognizer')
      const RecognizerIntent = plus.android.importClass('android.content.Intent')
      const RecognitionListener = plus.android.implements('android.speech.RecognitionListener', {
        onResults: (bundle) => {
          const ArrayList = plus.android.importClass('java.util.ArrayList')
          const results = bundle.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
          const text = results.get(0)
          this.messages.push(text)
        },
        onError: (err) => {
          console.error('语音识别出错:', err)
          this.messages.push('[语音识别失败]')
        },
        onReadyForSpeech: () => console.log('准备开始识别'),
        onBeginningOfSpeech: () => console.log('开始说话'),
        onEndOfSpeech: () => console.log('说话结束')
      })

      const recognizer = SpeechRecognizer.createSpeechRecognizer(main)
      recognizer.setRecognitionListener(RecognitionListener)

      const intent = new RecognizerIntent('android.speech.action.RECOGNIZE_SPEECH')
      intent.putExtra('android.speech.extra.LANGUAGE_MODEL', 'free_form')
      intent.putExtra('android.speech.extra.LANGUAGE', 'zh-CN')

      recognizer.startListening(intent)
    }
  }
}
</script>

<style>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.messages {
  flex: 1;
  padding: 20rpx;
  background-color: #f8f8f8;
}
.message {
  margin-bottom: 10rpx;
  padding: 10rpx;
  background: #fff;
  border-radius: 10rpx;
}
.input-area {
  display: flex;
  padding: 10rpx;
  background: #eee;
}
.text-input {
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 6rpx;
  padding: 10rpx;
  margin-right: 10rpx;
}
button {
  padding: 10rpx 20rpx;
}
</style>
  methods: {
    startRecognize() {
      const main = plus.android.runtimeMainActivity()
      const SpeechRecognizer = plus.android.importClass('android.speech.SpeechRecognizer')
      const RecognizerIntent = plus.android.importClass('android.content.Intent')
      const RecognitionListener = plus.android.implements('android.speech.RecognitionListener', {
        onResults: (bundle) => {
          const ArrayList = plus.android.importClass('java.util.ArrayList')
          const results = bundle.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
          this.result = results.get(0)
          console.log('识别结果：', this.result)
        },
        onError: (err) => {
          console.error('识别出错:', err)
          this.result = '识别出错：' + err
        },
        onReadyForSpeech: () => console.log('准备开始识别'),
        onBeginningOfSpeech: () => console.log('开始说话'),
        onEndOfSpeech: () => console.log('说话结束'),
        onPartialResults: () => {},
        onBufferReceived: () => {},
        onEvent: () => {},
        onRmsChanged: () => {},
        onResults: () => {}
      })

      const recognizer = SpeechRecognizer.createSpeechRecognizer(main)
      recognizer.setRecognitionListener(RecognitionListener)

      const intent = new RecognizerIntent('android.speech.action.RECOGNIZE_SPEECH')
      intent.putExtra('android.speech.extra.LANGUAGE_MODEL', 'free_form')
      intent.putExtra('android.speech.extra.LANGUAGE', 'zh-CN')

      recognizer.startListening(intent)
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