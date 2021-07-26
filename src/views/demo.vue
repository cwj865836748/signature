<template>
  <signature ref="signature" :isFullScreen="isFullScreen" :maxWidth="maxWidth" :penColor="penColor">
    <template v-slot:footer>
      <div class="allTools">
      <el-button type="primary" @click="savePng" size="mini">保存图片</el-button>
<!--      <el-button type="primary" @click="saveJPG" size="mini">保存jpg</el-button>-->
      <el-button type="primary" @click="fullscreen" size="mini">{{isFullScreen?'退出全屏':'全屏'}}</el-button>
      <el-button type="primary" @click="clear" size="mini">清除</el-button>
      <el-button type="primary" @click="revoke" size="mini">撤销</el-button>
      <el-button type="primary" @click="recover" size="mini">恢复</el-button>
      <el-button type="primary" @click="changeTool" size="mini">{{isWriting?'橡皮檫':'手写'}}</el-button>
      <div class="slider">
        <el-button type="primary" size="mini" @click="isShowSlider=!isShowSlider">字体粗细</el-button>
        <el-slider
          v-show="isShowSlider"
          class="sliderTool"
          v-model="sliderValue"
          :show-tooltip="false"
          :step="20"
          vertical
          @change="changeSize"
          height="100px">
        </el-slider>
      </div>
      <el-color-picker v-model="penColor" @change="changeColor"   show-alpha
                       :predefine="predefineColors">></el-color-picker>
      </div>
    </template>
  </signature>
</template>

<script>
import signature from '@/components/signature'
export default {
  name: 'demo',
  data () {
    return {
      isFullScreen: false,
      isWriting: true,
      isShowSlider: false,
      sliderValue: 60,
      maxWidth: 2,
      penColor: '#000',
      predefineColors: [
        '#000000',
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        '#c7158577'
      ]
    }
  },
  components: {
    signature
  },
  created () {

  },
  mounted () {
    window.onresize = () => {
      this.$refs.signature.cavansInit()
    }
    window.addEventListener('keydown', this.KeyDown, true)
  },
  methods: {
    savePng () {
      this.$refs.signature.savePNG()
    },
    fullscreen () {
      this.isFullScreen = !this.isFullScreen
      this.isWriting=true
      this.$refs.signature.fullscreen()
    },
    clear () {
      this.$refs.signature.clearSignaturePad()
      this.isWriting=true
    },
    revoke () {
      this.$refs.signature.revokeSignaturePad()
    },
    recover () {
      this.$refs.signature.recoverSignaturePad()
    },
    changeTool () {
      this.isWriting = !this.isWriting
      this.$refs.signature.changeTool()
    },
    changeSize (e) {
      switch (this.sliderValue) {
        case 0:
          this.maxWidth = 0.5
          break
        case 20:
          this.maxWidth = 1
          break
        case 40:
          this.maxWidth = 1.5
          break
        case 60:
          this.maxWidth = 2
          break
        case 80:
          this.maxWidth = 2.5
          break
        case 100:
          this.maxWidth = 3
          break
      }
    },
    changeColor (e) {
      this.penColor = e
    },
    KeyDown (event) {
      if (event.keyCode === 122) {
        event.returnValue = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.slider {
  position: relative;
}
  .sliderTool {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -100px;
    z-index: 10;
  }
  .allTools {
    display: flex;
    align-items: center;
  }
</style>
