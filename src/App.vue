<template>
  <div id="app">
    <keep-alive class="keep">
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view class="noKeep" v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>


export default {
  name: 'App',
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="scss">
  @import "assets/css/reset.scss";

  body {
    /*display: none; !**先隐藏，缩放后再显示，防止闪烁**!*/
    width: 1920px;
    height: 1080px;
    overflow: hidden;
    /*transform-origin: left top;// 缩放基点*/
    /*-ms-transform-origin: left top;*/
    /*-moz-transform-origin: left top;*/
    /*-webkit-transform-origin: left top;*/
    /*-o-transform-origin: left top*/
  }

  [v-cloak] {
    display: none
  }

  #app {
    width: 100% !important;
    height: 100%;
    overflow: hidden;
  }

</style>
