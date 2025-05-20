
export default class NLSClient {
  constructor({ appkey, token, onMessage, onOpen, onError, onClose }) {
    this.url = `wss://nls-gateway.cn-shanghai.aliyuncs.com/ws/v1?appkey=${appkey}&token=${token}&format=pcm&sample_rate=16000`
    this.socket = null
    this.isOpen = false
    this.audioQueue = []
    this.onMessage = onMessage
    this.onOpen = onOpen
    this.onError = onError
    this.onClose = onClose
  }

  connect() {
    this.socket = uni.connectSocket({
      url: this.url,
      success: () => {
        console.log('WebSocket 创建成功')
      },
      fail: (err) => {
        console.error('WebSocket 创建失败', err)
        this.onError && this.onError(err)
      }
    })

    uni.onSocketOpen(() => {
      console.log('WebSocket 连接已打开')
      this.isOpen = true
      this.onOpen && this.onOpen()

      // 如果之前有排队的音频数据，发送
      this.audioQueue.forEach(data => this.send(data))
      this.audioQueue = []
    })

    uni.onSocketMessage((res) => {
      console.log('收到消息:', res.data)
      try {
        const json = JSON.parse(res.data)
        this.onMessage && this.onMessage(json)
      } catch (e) {
        console.warn('解析消息失败:', e)
      }
    })

    uni.onSocketError((err) => {
      console.error('WebSocket 错误:', err)
      this.onError && this.onError(err)
    })

    uni.onSocketClose(() => {
      console.log('WebSocket 已关闭')
      this.isOpen = false
      this.onClose && this.onClose()
    })
  }

  send(buffer) {
    if (!this.isOpen) {
      this.audioQueue.push(buffer)
      return
    }

    if (typeof buffer === 'string') {
      buffer = this.str2ab(buffer)
    }

    uni.sendSocketMessage({
      data: buffer,
      success: () => {
        console.log('音频数据发送成功')
      },
      fail: (err) => {
        console.error('发送失败:', err)
      }
    })
  }

  stop() {
    // 通知服务端结束音频发送
    this.send(JSON.stringify({ "end": true }))
    console.log('发送结束标识')

    // 延迟关闭，确保服务端返回最后的识别结果
    setTimeout(() => {
      uni.closeSocket()
    }, 1500)
  }

  str2ab(str) {
    const buf = new ArrayBuffer(str.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i < str.length; i++) {
      view[i] = str.charCodeAt(i)
    }
    return buf
  }
}