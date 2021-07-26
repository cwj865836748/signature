<template>
  <div class="signature-pad">
    <div class="signature-pad--body">
      <canvas id="signatureCavans"></canvas>
      <div id="signature-pad--borderContent">
        <div class="signature-pad--border" v-for="item in signaturePadBorderNum" :key="item" :style="{top:item*70+'px'}"></div>
      </div>
    </div>
    <div class="signature-pad--footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
import SignaturePad from '@/utils/signature_pad.umd.js'
export default {
  name: 'signature',
  props: {
    minWidth: {
      type: Number,
      default: 0.1
    },
    maxWidth: {
      type: Number,
      default: 2
    },
    backgroundColor: {
      type: String,
      default: 'red'// transparent
    },
    // 是否全屏
    isFullScreen: {
      type: Boolean,
      default: false// transparent
    },
    // 橡皮檫尺寸
    eraserSize: {
      type: Number,
      default: 5// transparent
    },
    penColor: {
      type: String,
      default: 'black'
    }
  },
  data () {
    return {
      signatureCavans: null,
      signaturePad: null,
      signaturePadBorderNum: 0
    }
  },
  created () {

  },
  mounted () {
    this.init()
    window.document.oncontextmenu = function () {
      return false
    }
  },
  watch: {
    maxWidth (newVal) {
      this.signaturePad.maxWidth = newVal
    },
    penColor (newVal) {
      this.signaturePad.penColor = newVal
    }
  },
  methods: {

    init () {
      const signatureCavans = document.querySelector('#signatureCavans')
      console.log(this.maxWidth)
      const signaturePad = new SignaturePad(signatureCavans, {
        // It's Necessary to use an opaque color when saving image as JPEG;
        // this option can be omitted if only saving as PNG or SVG
        minWidth: this.minWidth,
        maxWidth: this.maxWidth,
        penColor: this.penColor,
        backgroundColor: this.backgroundColor// transparent
      })
      this.signatureCavans = signatureCavans
      this.signaturePad = signaturePad
      this.cavansInit()
    },
    cavansInit () {
      const ratio = Math.max(window.devicePixelRatio || 1, 1)
      this.signatureCavans.width = this.signatureCavans.offsetWidth * ratio
      this.signatureCavans.height = this.signatureCavans.offsetHeight * ratio
      this.signatureCavans.getContext('2d').scale(ratio, ratio)
      this.signaturePadBorderNum = parseInt(this.signatureCavans.offsetHeight / 70)
      // this.signaturePad.eraserSize = this.eraserSize
      this.signaturePad.clear()
    },
    // 保存png
    savePNG () {
      if (this.signaturePad.isEmpty()) {
        alert('请描绘文字！')
      } else {
        const dataURL = this.cutSignaturePad('')
        this.download(dataURL, 'signature.png')
      }
    },
    // 剪切图片
    cutSignaturePad (format) {
      const { minX, minY, maxX, maxY } = this.signaturePad
      const signatureCtx = this.signatureCavans.getContext('2d')
      const newCanvas = document.createElement('canvas')
      const newCtx = newCanvas.getContext('2d')
      console.log(minX, minY, maxX, maxY)
      const ratio = Math.max(window.devicePixelRatio || 1, 1)
      const size = this.aspectRatio((maxX - minX + 100) * ratio, (maxY - minY + 100) * ratio)
      const width = size.width
      const height = size.height

      newCanvas.width = width
      newCanvas.height = height
      console.log(minX, minY, width, height)
      const imgData = signatureCtx.getImageData(minX - 10, minY - 10, width, height)
      if (format) {
        for (var i = 0; i < imgData.data.length; i += 4) {
          if (imgData.data[i + 3] == 0) {
            imgData.data[i] = 255
            imgData.data[i + 1] = 255
            imgData.data[i + 2] = 255
            imgData.data[i + 3] = 255
          }
        }
      }
      newCtx.putImageData(imgData, 0, 0)
      return newCanvas.toDataURL(format)
    },
    // 比例换算
    aspectRatio (width, height, ratioz = 4, ratiof = 3) {
      if (width * ratiof == height * ratioz) {
        return { width, height }
      }
      if (width > height) {
        height = height + parseFloat(((width * ratiof - height * ratioz) / ratioz).toFixed(2))
        console.log(height)
        return {
          width, height
        }
      } else if (width < height) {
        width = width + parseFloat(((height * ratioz - width * ratiof) / ratiof).toFixed(2))
        return {
          width, height
        }
      }
    },
    // 撤销
    revokeSignaturePad () {
      const data = this.signaturePad.toData()
      const lastData = JSON.parse(this.signaturePad.lastData)
      this.signaturePad.isBack = false
      if (!this.signaturePad.isdrawing) {
        const signaturePadData = this.signaturePad._data
        // const index = signaturePad.once==0?lastData.length-signaturePad.once-1:lastData.length-signaturePad.once
        signaturePadData[signaturePadData - 1] = lastData[lastData.length - 1]
        // signaturePad._data.push(data[data.length-signaturePad.once])
        this.signaturePad.fromData(signaturePadData)
        return false
      }
      if (data) {
        data.pop() // remove the last dot or line
        lastData.length != this.signaturePad.once && this.signaturePad.once++
        this.signaturePad.fromData(data)
      }
    },
    // 清除
    clearSignaturePad () {
      this.signaturePad.clear()
    },
    // 恢复
    recoverSignaturePad () {
      if (!this.signaturePad.isdrawing) {
        return false
      }
      const data = JSON.parse(this.signaturePad.lastData)
      if (data.length == this.signaturePad._data.length || this.signaturePad.once == 0) {
        this.signaturePad.once = 0
        return false
      }

      console.log(data)
      console.log('总共条数:' + data.length, '撤回几次:' + this.signaturePad.once)
      this.signaturePad._data.push(data[data.length - this.signaturePad.once])
      this.signaturePad.once--
      this.signaturePad.fromData(this.signaturePad._data)
    },
    // 切换手写状态
    changeTool () {
      this.signaturePad.isdrawing = !this.signaturePad.isdrawing
    },
    // 全屏
    fullscreen () {
      const docElm = document.documentElement
      // W3C
      if (this.isFullScreen) {
        // W3C
        if (document.exitFullscreen) {
          document.exitFullscreen()
        }
        // FireFox
        else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        }
        // Chrome等
        else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        }
        // IE11
        else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen()
        }
        // FireFox
        else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen()
        }
        // Chrome等
        else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen()
        }
        // IE11
        else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen()
        }
      }
    },
    download (dataURL, filename) {
      if (navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') === -1) {
        window.open(dataURL)
      } else {
        const blob = this.dataURLToBlob(dataURL)
        const url = window.URL.createObjectURL(blob)

        const a = document.createElement('a')
        a.style = 'display: none'
        a.href = url
        a.download = filename

        document.body.appendChild(a)
        a.click()

        window.URL.revokeObjectURL(url)
      }
    },
    dataURLToBlob (dataURL) {
      // Code taken from https://github.com/ebidel/filer.js
      const parts = dataURL.split(';base64,')
      const contentType = parts[0].split(':')[1]
      const raw = window.atob(parts[1])
      const rawLength = raw.length
      const uInt8Array = new Uint8Array(rawLength)

      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
      }

      return new Blob([uInt8Array], { type: contentType })
    }
  }
}
</script>

<style lang="scss" scoped>

  .signature-pad {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: #fff;
  }

  .signature-pad--body {
    position: relative;
    flex: 1;
  }
  .signature-pad--border {
    border-top:3px dashed red;
    width: 100%;
    background: transparent;
    position: absolute;
    left: 0;
  }
  canvas {
    z-index: 2;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  #signature-pad--borderContent {
    position: relative;
    z-index: 1;
    height: 100%;
  }

  .signature-pad--footer {

  }
</style>
